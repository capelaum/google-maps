import { NaturalEvent } from 'types/event'
import styles from './styles.module.scss'

export function LocationInfoBox({
  id,
  title,
  geometries,
  categories,
}: NaturalEvent) {
  const category = categories[0].title.replaceAll(' ', '-').toLowerCase()

  return (
    <div
      id="locationInfoBox"
      className={`${styles.locationInfoContainer} ${category} `}
    >
      <h2>{title}</h2>
      <ul>
        <li>
          ID: <strong>{id}</strong>
        </li>
        <li>
          Category: <strong>{categories[0].title}</strong>
        </li>
        <li>
          Date:{' '}
          <strong>
            {new Date(geometries[0].date).toLocaleDateString('en-US')}
          </strong>
        </li>
      </ul>
    </div>
  )
}
