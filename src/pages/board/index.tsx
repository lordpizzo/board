import Head from 'next/head'
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '@/src/components/SupportButton'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
export default function Board() {
	return (
		<>
			<Head>
				<title>Minhas tarefas</title>
			</Head>
			<main className={styles.container}>
				<form>
					<input type="text" placeholder='Digite dua tarefa' />
					<button type="submit">
						<FiPlus size={25} color="#17181a" />
					</button>
				</form>
				<h1>Você tem duas tarefas</h1>

				<section>
					<article className={styles.taskList}>
						<p>Aprender next</p>
						<div className={styles.actions}>
							<div>
								<div>
									<FiCalendar size={20} color="#FFB800" />
									<time>21 Janeiro 2023</time>
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
					</article>
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

export const getServerSideProps: GetServerSideProps = async ({req}) => {
	const session = await getSession({req})

	if(!session?.user){
		return {
			redirect:{
				destination: '/',
				permanent: false
			}
		}
	}
	
	return {
		props: {

		}
	}
}
