import React from 'react'
import { InputProps } from '../../interfaces'
import styles from './styles.module.scss'

export const Input = ({ ...rest }: InputProps) => {
	return <input className={styles.input} {...rest} />
}
