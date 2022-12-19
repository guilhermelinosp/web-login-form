import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthError } from '../errors/AuthError'

export function SSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
	return async (
		ctx: GetServerSidePropsContext
	): Promise<GetServerSidePropsResult<P> | undefined> => {
		const cookie = parseCookies(ctx)

		const token = cookie['@login:token']

		if (!token) {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}

		try {
			return await fn(ctx)
		} catch (err) {
			if (err instanceof AuthError) {
				destroyCookie(ctx, '@login:token')

				return {
					redirect: {
						destination: '/',
						permanent: false
					}
				}
			}
		}
	}
}
