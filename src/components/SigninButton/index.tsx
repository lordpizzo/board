import styles from './styles.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import Image from 'next/image'
export function SingnInButton() {
	const session = true
	return session ? (
		<button
		type='button'
		className={styles.singInButton}
		onClick={() => {}}>
			<img src='https://sujeitoprogramador.com/steve.png' alt='eu'/>
			Olá Raphael Pizzo
			<FiX color='#737380' className={styles.closeIcon}/>
		</button>
	) : (
		<button
		type='button'
		className={styles.singInButton}
		onClick={() => {}}>
			<FaGithub color='#FFB800'/>
			Entrar com GitHub
		</button>
	)
}
