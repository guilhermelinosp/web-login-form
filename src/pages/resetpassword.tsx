import React from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import styles from '../styles/resetpassword.module.scss'
import { toast } from 'react-toastify'
import { AuthContext } from '../contexts/AuthContext'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import stylesInput from '../components/Input/styles.module.scss'
import { SSRPass } from '../utils/SSR/SSRPass'

export default function ResetPassword() {
	const [password, setPassword] = React.useState('')
	const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [visible, setVisible] = React.useState(false)

	const { resetPassword } = React.useContext(AuthContext)

	const handleResetPassword = async (event: React.FormEvent) => {
		event.preventDefault()

		if (password === '' || passwordConfirmation === '') {
			toast.warning('Password and password confirmation are required')
			return
		}

		if (password !== passwordConfirmation) {
			toast.warning('Password and confirm password must be the same')
			return
		}

		setLoading(true)

		await resetPassword({ password })

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Reset Password | Login Form</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.content}>
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

					<div className={styles.passwordContent}>
						<Input
							placeholder="Password Confirmation"
							type={visible ? 'text' : 'password'}
							autoCapitalize="none"
							value={passwordConfirmation}
							onChange={(passwordConfirmation) =>
								setPasswordConfirmation(passwordConfirmation.target.value)
							}
							style={{ margin: 0, border: 0, marginBottom: 2, width: '100%' }}
						/>

						<button onClick={() => setVisible(!visible)} className={styles.buttonEye}>
							{visible ? <FiEyeOff color="#ddd" size={25} /> : <FiEye color="#ddd" size={25} />}
						</button>
					</div>
					<Button loading={loading} onClick={handleResetPassword} type="submit">
						Reset Password
					</Button>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = SSRPass(async (ctx) => {
	return {
		props: {}
	}
})
