import Head from 'next/head'
import styles from './styles.module.scss'
import { FiPlus } from 'react-icons/fi'
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
					<article>
						<p>Aprender next</p>
						<div className={styles.task}>

						</div>
					</article>
				</section>
			</main>
		</>
	)
}
