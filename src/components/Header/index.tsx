import { Button } from 'components/Button'
import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface HeaderProps {
  children: ReactNode
  title: string
}

export function Header({ children, title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Button>
          <Link href="/">Voltar</Link>
        </Button>
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  )
}
