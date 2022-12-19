import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/forgotpassword.module.scss'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'
import { AuthContext } from '../contexts/AuthContext'

export default function CheckToken() {
	const [token, setToken] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const { checkToken } = React.useContext(AuthContext)

	const handleCheckToken = async (event: React.FormEvent) => {
		event.preventDefault()

		if (token === '') {
			toast.warning('Token is required')
			return
		}

		if (token.length < 30) {
			toast.warning('Token is invalid')
			return
		}

		setLoading(true)

		console.log('token', token)
		await checkToken({ token })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Check Token | Login Form</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.content}>
					<Input
						placeholder="Digite seu Token"
						type="text"
						autoCapitalize="none"
						value={token}
						onChange={token => setToken(token.target.value)}
					/>

					<Button loading={loading} onClick={handleCheckToken} type="submit">
						Check Token
					</Button>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = SSRGuest(async ctx => {
	return {
		props: {}
	}
})
