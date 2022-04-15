import { Button } from 'components/Button'
import { Header } from 'components/Header'
import Link from 'next/link'
import { NaturalEvent } from 'types/event'
import styles from './styles.module.scss'

interface HeaderProps {
  eventData: NaturalEvent[]
}

interface EventCategories {
  [key: string]: number
}

export function GoogleMapReactHeader({ eventData }: HeaderProps) {
  const eventCategories = eventData.reduce((acc, event) => {
    const category = event.categories[0].title

    acc.hasOwnProperty(category) ? acc[category]++ : (acc[category] = 1)

    return acc
  }, {} as EventCategories)

  return (
    <Header title="Natural Events Tracker (Powered By NASA)">
      <div className={styles.info}>
        <ul className={styles.categoryList}>
          {Object.keys(eventCategories).map((category) => (
            <li key={category}>
              {category}: {eventCategories[category]}
            </li>
          ))}
        </ul>
        <h2>Total: {eventData.length}</h2>
      </div>
      <Link href="/" passHref>
        <Button>Voltar</Button>
      </Link>
    </Header>
  )
}
