import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'
export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/">
					<Image src="/images/logo.svg" alt="PizzoSoft" width={65} height={65}/>
				</Link>
				<nav>
					<Link href="/">
						Home
					</Link>
					<Link href="/board">
						Meu Board
					</Link>
				</nav>
				<button>
					Entrar com GitHub
				</button>
			</div>
		</header>
	)
}
