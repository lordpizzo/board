import Head from 'next/head'
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '@/src/components/SupportButton'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import firesotreDB from '../../services/firebaseConnection'
import { collection, addDoc, doc, getDoc, query, getDocs, orderBy, where } from "firebase/firestore";
import { format } from 'date-fns'
import Link from 'next/link'

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
	console.log(dados)
	const [input, setInput] = useState('')
	const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(dados))
	async function handleAddTask(e: FormEvent) {
		e.preventDefault()
		if (input === '') {
			alert('Preencha alguma tarefa')
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

	return (
		<>
			<Head>
				<title>Minhas tarefas</title>
			</Head>
			<main className={styles.container}>
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
								<div className={styles.actions}>
									<div>
										<div>
											<FiCalendar size={20} color="#FFB800" />
											<time>{task.createdFormated}</time>
										</div>
										<button>
											<FiEdit size={20} color="FFF" />
											<span>Editar</span>
										</button>
									</div>
									<button>
										<FiTrash size={20} color="#FF3636" />
										<span>Excluir</span>
									</button>

								</div>
							</Link>
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
						Ultima doaçãofoi a 3 meses
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
	let dados = [{}]
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
