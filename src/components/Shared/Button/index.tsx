import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
  href?: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Button({ href, children, className, onClick }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} passHref>
        <a className={`${styles.buttonLink} ${className}`}>{children}</a>
      </Link>
    )
  }

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
