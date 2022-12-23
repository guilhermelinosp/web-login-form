import React from 'react'
import Head from 'next/head'
import styles from '../styles/dashboard.module.scss'
import { SSRAuth } from '../utils/SSR/SSRAuth'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard() {
	const { signOut } = React.useContext(AuthContext)
	return (
		<>
			<Head>
				<title>Dashboard | Login Form</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.content}>
					<button onClick={signOut} style={{ margin: 0, border: 0, background: '#fff' }}>
						<FiLogOut color="#f00" size={40} />
					</button>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = SSRAuth(async (ctx) => {
	return {
		props: {}
	}
})
