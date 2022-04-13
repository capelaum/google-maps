import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
