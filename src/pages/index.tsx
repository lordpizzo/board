import Head from "next/head";
import Image from "next/image";
import styles from '../styles/home.module.scss'
import { GetStaticProps } from 'next'

export default function Home() {
	return (
		<>
			<Head>
				<title>Board - ToDo app</title>
			</Head>
			<main className={styles.contentContainer}>
				<Image src="/images/board-user.svg" alt="board" width={300} height={300} />
				<section className={styles.callToAction}>
					<h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...</h1>
					<p>
						<span>100% Gratuito </span>
						e online.
					</p>
				</section>

				<div className={styles.donaters}>
					<Image src="/images/board-user.svg" alt="apoiador" width={80} height={80} />
					<Image src="/images/board-user.svg" alt="apoiador" width={80} height={80} />
					<Image src="/images/board-user.svg" alt="apoiador" width={80} height={80} />
					<Image src="/images/board-user.svg" alt="apoiador" width={80} height={80} />
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {

	return {
		props: {

		},
		revalidate: 60 * 60 //atualiza a cada 60 minutos
	}
}
