import { Header } from 'components/Header'
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

    !acc.hasOwnProperty(category) ? (acc[category] = 1) : acc[category]++

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
    </Header>
  )
}
