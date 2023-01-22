import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import styles from './styles.module.scss'

interface Props {
	user: {
		name: string,
		id: string,
		image: string
	}
}

export default function Donate({ user }: Props) {
	console.log(user)
	return (
		<>
			<Head>
				<title>Ajude a plataforma board a ficar online!</title>
			</Head>
			<main className={styles.container}>
				<img src="/images/rocket.svg" alt="Seja Apoiador" />
				<div className={styles.vip}>
					<img src={user.image} alt={user.name} />
					<span>Parabéns você é um apoiador!</span>
				</div>
				<h1>Seja um apoiador deste projeto 🏆</h1>
				<h3>Contribua com apenas <span>R$1,00</span></h3>
				<strong>Apareça na nossa home, tenha funcionalidades exclusivas</strong>
			</main>
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

	const user = {
		nome: session?.user.name,
		id: session?.user.email,
		image: session?.user.image,
	}

	return {
		props: {
			user
		}
	}
}
