/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */

import Head from 'next/head'
import React from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/home.module.scss'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'
import { AuthContext } from '../contexts/AuthContext'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import stylesInput from '../components/Input/styles.module.scss'

export default function Home() {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [visible, setVisible] = React.useState(false)

	const { signIn } = React.useContext(AuthContext)

	const handleSignIn = async (event: React.FormEvent) => {
		event.preventDefault()

		if (email === '' || password === '') {
			toast.warning('Email and password are required')
			return
		}

		setLoading(true)

		await signIn({ email, password })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Sign In | Login Form</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.content}>
					<Input
						placeholder="Email"
						type="email"
						autoCapitalize="none"
						value={email}
						onChange={(email) => setEmail(email.target.value)}
					/>

					<div className={styles.passwordContent}>
						<Input
							placeholder="Password"
							type={visible ? 'text' : 'password'}
							autoCapitalize="none"
							value={password}
							onChange={(password) => setPassword(password.target.value)}
							className={stylesInput.input}
							style={{ margin: 0, border: 0, marginBottom: 2, width: '100%' }}
						/>

						<button onClick={() => setVisible(!visible)} className={styles.buttonEye}>
							{visible ? <FiEyeOff color="#ddd" size={25} /> : <FiEye color="#ddd" size={25} />}
						</button>
					</div>

					<Button loading={loading} onClick={handleSignIn} type="submit">
						Sign In
					</Button>

					<div className={styles.links}>
						<p>
							Don't have an account? <a href="/signup">Try ir Free</a>
						</p>

						<p>
							Forgot your password? <a href="/forgotpassword">Reset</a>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = SSRGuest(async (ctx) => {
	return {
		props: {}
	}
})
