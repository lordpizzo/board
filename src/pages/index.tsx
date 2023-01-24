import Head from "next/head";
import Image from "next/image";
import styles from '../styles/home.module.scss'
import { GetStaticProps } from 'next'
import firesotreDB from '../services/firebaseConnection'
import { collection, addDoc, doc, getDoc, query, getDocs, orderBy, where, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import imagem from '../../public/images/board-user.svg'

type Donetor = {
	id: string,
	donate: boolean,
	lastDonate: Date,
	Image: string
}

interface Props {
	dados: string
}

export default function Home({ dados }: Props) {

	const [donaters, setDonaters] = useState<Donetor[]>(JSON.parse(dados))

	return (
		<>
			<Head>
				<title>Board - ToDo app</title>
			</Head>
			<main className={styles.contentContainer}>
				<Image src={imagem} alt="board" width={300} height={300} />
				<section className={styles.callToAction}>
					<h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...</h1>
					<p>
						<span>100% Gratuito </span>
						e online.
					</p>
				</section>
				{donaters.length !== 0 && <h3>Apoiadores: </h3>}
				<div className={styles.donaters}>
					{donaters.map(donator => (
						<img src={donator.Image} key={donator.id} alt="apoiador" width={80} height={80} />
					))}
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {

	const tarefasCollection = collection(firesotreDB, "users")
	const tarefasQuery = query(tarefasCollection)
	const tarefasSnapshot = await getDocs(tarefasQuery)
	let dados = []
	tarefasSnapshot.forEach((doc) => {
		dados.push(
			{
				userId: doc.id,
				...doc.data()
			}
		)
	})
	dados = JSON.stringify(dados)
	return {
		props: {
			dados
		},
		revalidate: 60 * 60 //atualiza a cada 60 minutos
	}
}
