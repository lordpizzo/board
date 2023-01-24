import Image from 'next/image'
import Link from 'next/link'
import { SingnInButton } from '../SigninButton'
import styles from './styles.module.scss'
import logo from '../../../public/images/logo.svg'

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/">
					<Image src={logo} alt="PizzoSoft" width={65} height={65} />
				</Link>
				<nav>
					<Link href="/">
						Home
					</Link>
					<Link href="/board">
						Meu Board
					</Link>
				</nav>
				<SingnInButton />
			</div>
		</header>
	)
}
