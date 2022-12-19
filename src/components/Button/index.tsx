import React from 'react'
import styles from './styles.module.scss'
import { AiOutlineLoading } from 'react-icons/ai'
import { ButtonProps } from '../../interfaces'

export const Button = ({ loading, children, ...rest }: ButtonProps) => {
	return (
		<button className={styles.button} disabled={loading} {...rest}>
			{loading ? (
				<AiOutlineLoading color="#000" size={24} />
			) : (
				<a className={styles.text}>{children}</a>
			)}
		</button>
	)
}
