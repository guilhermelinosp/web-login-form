import { CheckTokenProps } from './CheckTokenProps'
import { ForgotPasswordProps } from './ForgotPasswordProps'
import { ResetPasswordProps } from './ResetPasswordProps'
import { SignInProps } from './SignInProps'
import { SignUpProps } from './SignUpProps'
import { UserProps } from './UserProps'

export interface AuthContextProps {
	user: UserProps
	isAuthenticated: boolean
	checkToken: (credentials: CheckTokenProps) => Promise<void>
	signIn: (credentials: SignInProps) => Promise<void>
	signUp: (credentials: SignUpProps) => Promise<void>
	forgotPassword: (credentials: ForgotPasswordProps) => Promise<void>
	resetPassword: (credentials: ResetPasswordProps) => Promise<void>
	signOut: () => void
}
