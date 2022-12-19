/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/signup.module.scss'
import { SSRGuest } from '../utils/SSR/SSRGuest'
import { toast } from 'react-toastify'
import { AuthContext } from '../contexts/AuthContext'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import stylesInput from '../components/Input/styles.module.scss'

export default function SignUp() {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [visible, setVisible] = React.useState(false)

	const { signUp } = React.useContext(AuthContext)

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault()

		if (name === '' || email === '' || password === '' || passwordConfirmation === '') {
			toast.warning('All fields are required')

			return
		}

		if (password !== passwordConfirmation) {
			toast.warning('Passwords do not match')
			return
		}

		setLoading(true)

		await signUp({
			name,
			email,
			password
		})

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Sign Up | Login Form</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.content}>
					<Input
						placeholder="Full Name"
						type="text"
						autoCapitalize="none"
						value={name}
						onChange={name => setName(name.target.value)}
					/>
					<Input
						placeholder="Email"
						type="email"
						autoCapitalize="none"
						value={email}
						onChange={email => setEmail(email.target.value)}
					/>

					<div className={styles.passwordContent}>
						<Input
							placeholder="Password"
							type={visible ? 'text' : 'password'}
							autoCapitalize="none"
							value={password}
							onChange={password => setPassword(password.target.value)}
							className={stylesInput.input}
							style={{ margin: 0, border: 0, marginBottom: 2, width: '100%' }}
						/>

						<button onClick={() => setVisible(!visible)} className={styles.buttonEye}>
							{visible ? <FiEyeOff color="#ddd" size={25} /> : <FiEye color="#ddd" size={25} />}
						</button>
					</div>

					<div className={styles.passwordContent}>
						<Input
							placeholder="Password Confirmation"
							type={visible ? 'text' : 'password'}
							autoCapitalize="none"
							value={passwordConfirmation}
							onChange={passwordConfirmation =>
								setPasswordConfirmation(passwordConfirmation.target.value)
							}
							style={{ margin: 0, border: 0, marginBottom: 2, width: '100%' }}
						/>

						<button onClick={() => setVisible(!visible)} className={styles.buttonEye}>
							{visible ? <FiEyeOff color="#ddd" size={25} /> : <FiEye color="#ddd" size={25} />}
						</button>
					</div>

					<Button loading={loading} onClick={handleSubmit} type="submit">
						Create Account
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
