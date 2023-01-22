import Head from 'next/head'
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit, FiTrash, FiClock, FiX } from 'react-icons/fi'
import { SupportButton } from '@/src/components/SupportButton'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import firesotreDB from '../../services/firebaseConnection'
import { collection, addDoc, doc, getDoc, query, getDocs, orderBy, where, deleteDoc, updateDoc } from "firebase/firestore";
import { format } from 'date-fns'
import Link from 'next/link'
import { createSolutionBuilderHost } from 'typescript'

type TaskList = {
	id: string,
	create: string | Date,
	createdFormated?: string,
	tarefa: string,
	userId: string,
	name: string
}

interface Props {
	user: {
		name: string,
		email: string,
		image: string
	},
	dados: string
}

export default function Board({ user, dados }: Props) {
	const [input, setInput] = useState('')
	const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(dados))
	const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

	async function handleAddTask(e: FormEvent) {
		e.preventDefault()
		if (input === '') {
			alert('Preencha alguma tarefa')
			return
		}

		if (taskEdit) {
			const tarefasCollection = collection(firesotreDB, "tarefas")
			const tarefasDoc = doc(tarefasCollection, taskEdit.id)
			await updateDoc(tarefasDoc,
				{
					tarefa: input
				})
				.then(() => {
					let data = taskList
					let taskIndex = taskList.findIndex(item => item.id === taskEdit.id)

					data[taskIndex].tarefa = input
					setTaskList(data)
					setTaskEdit(null)
					setInput('')

				})
				.catch((error) => {
					console.log('Error ao atualizar', error)
				})

			return

		}

		await addDoc(collection(firesotreDB, "tarefas"), {
			created: new Date(),
			tarefa: input,
			userId: user.email,
			name: user.name
		})
			.then((documento) => {
				let data = {
					id: documento.id,
					created: new Date(),
					createdFormated: format(new Date(), 'dd MMMM yyyy'),
					tarefa: input,
					userId: user.email,
					name: user.name
				}

				setTaskList([...taskList, data])
				setInput('')

			}).catch((error) => {
				console.log('Deu Erro', error)
			})

	}

	async function handleDelete(id: string) {
		const tarefasCollection = collection(firesotreDB, "tarefas")
		const tarefasDoc = doc(tarefasCollection, id)
		await deleteDoc(tarefasDoc).then(() => {
			let taskDeleted = taskList.filter(item => {
				return (item.id !== id)
			})
			setTaskList(taskDeleted)
		})
			.catch((error) => {
				console.log('Erro ao excluir: ', error)
			})
	}
	async function handleEditTask(task: TaskList) {
		setInput(task.tarefa)
		setTaskEdit(task)
	}

	function handleCancelEdit() {
		setInput('')
		setTaskEdit(null)
	}

	return (
		<>
			<Head>
				<title>Minhas tarefas</title>
			</Head>
			<main className={styles.container}>
				{taskEdit && (
					<span className={styles.warnText}>
						<button onClick={() => handleCancelEdit()}>
							<FiX size={30} color="#FF3636" />
						</button>
						Você está editando uma tarefa
					</span>
				)}
				<form onSubmit={handleAddTask}>
					<input
						type="text"
						placeholder='Digite dua tarefa'
						value={input}
						onChange={(e) => setInput(e.target.value)} />
					<button type="submit">
						<FiPlus size={25} color="#17181a" />
					</button>
				</form>
				<h1>Você tem {taskList.length} {taskList.length === 1 ? 'tarefa' : 'tarefas'}</h1>

				<section>
					{taskList.map(task => (

						<article className={styles.taskList} key={task.id}>
							<Link href={`/board/${task.id}`}>
								<p>{task.tarefa}</p>
							</Link>
							<div className={styles.actions}>
								<div>
									<div>
										<FiCalendar size={20} color="#FFB800" />
										<time>{task.createdFormated}</time>
									</div>
									<button onClick={() => handleEditTask(task)}>
										<FiEdit size={20} color="FFF" />
										<span>Editar</span>
									</button>
								</div>
								<button onClick={() => handleDelete(task.id)}>
									<FiTrash size={20} color="#FF3636" />
									<span>Excluir</span>
								</button>

							</div>

						</article>
					))}
				</section>
			</main>
			<div className={styles.vipContainer}>
				<h3>
					Obrigado por apoiar esse projeto
				</h3>
				<div>
					<FiClock size={28} color="#FFF" />
					<time>
						Ultima doação foi a 3 meses
					</time>
				</div>
			</div>

			<SupportButton />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req })

	if (!session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const tarefasCollection = collection(firesotreDB, "tarefas")

	const tarefasQuery = query(tarefasCollection,
		where('userId', '==', session.user.email),
		orderBy('created', 'asc'))

	const tarefasSnap = await getDocs(tarefasQuery)
	let dados = []
	tarefasSnap.forEach((doc) => {
		dados.push(
			{
				id: doc.id,
				createdFormated: format(doc.data().created.toDate(), 'dd MMMM yyyy'),
				...doc.data()
			}
		)
	})
	dados = JSON.stringify(dados)

	return {
		props: {
			user: session.user,
			dados
		}
	}
}
