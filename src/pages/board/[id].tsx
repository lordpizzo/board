import { format } from "date-fns";
import { collection, doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head";
import firesotreDB from '../../services/firebaseConnection'
import styles from './task.module.scss'

import { FiCalendar } from 'react-icons/fi'

type TaskList = {
	id: string,
	create: string | Date,
	createdFormated?: string,
	tarefa: string,
	userId: string,
	name: string
}

interface TaskListProps {
	data: string
}



export default function Task({ data }: TaskListProps) {
	const task = JSON.parse(data) as TaskList
	console.log(task.name)

	return (
		<>
			<Head>
				<title>Detalhes da sua tarefa</title>
			</Head>
			<article className={styles.container}>
				<div className={styles.actions}>
					<div>
						<FiCalendar size={30} color="#FFF" />
						<span>Tarefa criada: </span>
						<time>{task.createdFormated}</time>
					</div>
				</div>
				<p>{task.tarefa}</p>
			</article>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
	const { id } = params;
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
	const tarefasDocRef = doc(tarefasCollection, id)
	const data = await getDoc(tarefasDocRef)
		.then((snapshot) => {
			const data = {
				id: snapshot.id,
				created: snapshot.data()?.created,
				createdFormated: format(new Date(), 'dd MMMM yyyy'),
				tarefa: snapshot.data()?.tarefa,
				userId: snapshot.data()?.userId,
				name: snapshot.data()?.name
			}

			return JSON.stringify(data)
		})

	return {
		props: {
			data
		}
	}
}
