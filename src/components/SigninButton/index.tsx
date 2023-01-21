import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"


export function SingnInButton() {
	const { data: session } = useSession()
	return session ? (
		<button
			type='button'
			className={styles.singInButton}
			onClick={() => signOut()}>
			<Image src={session.user!.image} alt='eu' width={35} height={35}/>
			Olá {session.user!.name}
			<FiX color='#737380' className={styles.closeIcon} />
		</button>
	) : (
		<button
			type='button'
			className={styles.singInButton}
			onClick={() => signIn('github')}>
			<FaGithub color='#FFB800' />
			Entrar com GitHub
		</button>
	)
}
