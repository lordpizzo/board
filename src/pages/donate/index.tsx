import { PayPalButtons } from '@paypal/react-paypal-js'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import styles from './styles.module.scss'
import firesotreDB from '../../services/firebaseConnection'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import rocket from '../../../public/images/rocket.svg'
import Image from 'next/image'
interface Props {
	user: {
		name: string,
		id: string,
		image: string
	}
}

export default function Donate({ user }: Props) {

	const [vip, setVip] = useState(false)

	async function handleSaveDonate() {
		await setDoc(doc(firesotreDB, "users", user.id), {
			donate: true,
			lastDonate: new Date(),
			Image: user.image
		}).then(() => {
			setVip(true)
		})

	}

	return (
		<>
			<Head>
				<title>Ajude a plataforma board a ficar online!</title>
			</Head>
			<main className={styles.container}>
				<Image src={rocket} alt="Seja Apoiador" />

				{vip && (
					<div className={styles.vip}>
						<Image src={user.image} alt={user.name} width={50} height={50}/>
						<span>Parabéns você é um apoiador!</span>
					</div>
				)}

				<h1>Seja um apoiador deste projeto 🏆</h1>
				<h3>Contribua com apenas <span>R$1,00</span></h3>
				<strong>Apareça na nossa home, tenha funcionalidades exclusivas</strong>

				<PayPalButtons createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [{
							amount: {
								value: '1'
							}
						}]
					})
				}}
					onApprove={(data, actions) => {
						return actions.order?.capture().then(function (details) {
							console.log('Compra aprovada: ' + details.payer.name?.given_name)
							handleSaveDonate()
						})
					}}
				>

				</PayPalButtons>
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
