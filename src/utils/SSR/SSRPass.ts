import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthError } from '../errors/AuthError'

export function SSRPass<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
	return async (
		ctx: GetServerSidePropsContext
	): Promise<GetServerSidePropsResult<P> | undefined> => {
		const cookie = parseCookies(ctx)

		const tokenResetPassword = cookie['@login:tokenResetPassword']

		if (!tokenResetPassword) {
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
				destroyCookie(ctx, '@login:tokenResetPassword')

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
