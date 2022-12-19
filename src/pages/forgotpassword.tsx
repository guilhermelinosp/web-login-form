import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/forgotpassword.module.scss'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'
import { AuthContext } from '../contexts/AuthContext'

export default function ForgotPassword() {
	const [email, setEmail] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	const { forgotPassword } = React.useContext(AuthContext)

	const handleForgotPassword = async (event: React.FormEvent) => {
		event.preventDefault()

		if (email === '') {
			toast.warning('Email is required')
			return
		}

		setLoading(true)

		await forgotPassword({ email })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Forgot Password | Login Form</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.content}>
					<Input
						placeholder="Email"
						type="email"
						autoCapitalize="none"
						value={email}
						onChange={email => setEmail(email.target.value)}
					/>

					<Button loading={loading} onClick={handleForgotPassword} type="submit">
						Reset Password
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
