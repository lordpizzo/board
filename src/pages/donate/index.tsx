import { PayPalButtons } from '@paypal/react-paypal-js'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import styles from './styles.module.scss'
import firesotreDB from '../../services/firebaseConnection'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'


/// CLIENT_ID AUiBTbQrW2samga_IJScDziFo4Hq3l7XPlPxSil6P3L8XT-JXXAjr47YZm0BDsFYnquP8viMDQLzJCZ_
//// SECRET ENo_iUnfw_C9mi5C9yvKSgAhODsgUiruliE_Df1HReCYxtSYyhUhoTcS4uvXI_FdGAWl97hCMHaTsUsA
////<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
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
				<img src="/images/rocket.svg" alt="Seja Apoiador" />

				{vip && (
					<div className={styles.vip}>
						<img src={user.image} alt={user.name} />
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
