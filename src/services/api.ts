import axios from 'axios'
import { parseCookies } from 'nookies'

export const setupAPIClient = (ctx = undefined) => {
	const cookies = parseCookies(ctx)

	const api = axios.create({
		baseURL: 'https://api-login-form.herokuapp.com/api/v1',
		headers: {
			Authorization: `Bearer ${cookies['@login:token']}`
		}
	})

	return api
}

export const api = setupAPIClient()
