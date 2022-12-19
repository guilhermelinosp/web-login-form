import React from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/api'
import { toast } from 'react-toastify'
import {
	AuthContextProps,
	AuthProviderProps,
	UserProps,
	ForgotPasswordProps,
	SignInProps,
	SignUpProps,
	ResetPasswordProps,
	CheckTokenProps
} from '../interfaces'

export function signOut() {
	destroyCookie(undefined, '@login:token')

	if (typeof window !== 'undefined') {
		Router.push('/')
	}
}

export const AuthContext = React.createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = React.useState<UserProps>({
		id: '',
		name: '',
		email: ''
	} as UserProps)

	const isAuthenticated = !!user

	const signIn = async ({ email, password }: SignInProps) => {
		try {
			const { data } = await api.post('/signin', {
				email,
				password
			})

			setCookie(undefined, '@login:token', data.token, {
				maxAge: 60 * 60 * 1
			})

			setUser({
				id: data.user.id,
				name: data.user.name,
				email: data.user.email
			})

			api.defaults.headers['Authorization'] = `Bearer ${data.token}`

			setCookie(undefined, '@login:token', data.token, {
				maxAge: 60 * 60 * 24,
				path: '/'
			})

			Router.push('/dashboard')
		} catch (err) {
			toast.error('Email or password incorrect')
			console.log(err)
		}
	}

	const signUp = async ({ name, email, password }: SignUpProps) => {
		try {
			await api.post('/signup', {
				name,
				email,
				password,
				password_confirmation: password
			})

			toast.success('Account created successfully')

			Router.push('/')
		} catch (err) {
			toast.error('Email already in use')
			console.log(err)
		}
	}

	const forgotPassword = async ({ email }: ForgotPasswordProps) => {
		try {
			await api.post('/forgotpassword', {
				email
			})

			Router.push('/checktoken')

			toast.success('Check your email to reset your password')
		} catch (err) {
			console.log(err)
			toast.error('Email not found')
		}
	}

	const checkToken = async ({ token }: CheckTokenProps) => {
		setCookie(undefined, '@login:tokenResetPassword', token, {
			maxAge: 60 * 60 * 2,
			path: '/'
		})

		Router.push('/resetpassword')
	}

	const resetPassword = async ({ password }: ResetPasswordProps) => {
		const token = parseCookies()

		try {
			await api.post('/resetpassword', {
				password,
				password_confirmation: password,
				token: token['@login:tokenResetPassword']
			})

			toast.success('Passwords changed successfully')

			Router.push('/')

			destroyCookie(undefined, '@login:tokenResetPassword')
		} catch (err) {
			console.log(err)
			toast.error('Token expired')
			Router.push('/')
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				checkToken,
				signIn,
				signOut,
				signUp,
				forgotPassword,
				resetPassword
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
