import { IoIosLeaf } from 'react-icons/io'
import { NaturalEvent } from 'types/event'
import styles from './styles.module.scss'

interface HeaderProps {
  eventData: NaturalEvent[]
}

interface EventCategories {
  [key: string]: number
}

export function Header({ eventData }: HeaderProps) {
  const eventCategories = eventData.reduce((acc, event) => {
    const category = event.categories[0].title

    !acc.hasOwnProperty(category) ? (acc[category] = 1) : acc[category]++

    return acc
  }, {} as EventCategories)

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <IoIosLeaf size={20} color="white" />
        <h1>Natural Events Tracker (Powered By NASA)</h1>
      </div>

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
    </header>
  )
}
