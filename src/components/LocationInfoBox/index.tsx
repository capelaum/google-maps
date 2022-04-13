import { NaturalEvent } from 'types/event'
import styles from './styles.module.scss'

export function LocationInfoBox({ id, title, geometries }: NaturalEvent) {
  return (
    <div className={styles.locationInfoContainer}>
      <h2>{title}</h2>
      <ul>
        <li>
          ID: <strong>{id}</strong>
        </li>
        <li>
          Date: <strong>{geometries[0].date}</strong>
        </li>
      </ul>
    </div>
  )
}
