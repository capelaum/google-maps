import { DirectionsLeg } from 'types/googleMaps'
import styles from './styles.module.scss'

type DistanceProps = {
  leg: DirectionsLeg
}

export function Distance({ leg }: DistanceProps) {
  if (!leg.distance || !leg.duration) return null

  return (
    <div className={styles.distanceContainer}>
      <ul>
        <li>
          Distância:{' '}
          <span className={styles.highlight}>{leg.distance.text}</span>
        </li>
        <li>
          Tempo: <span className={styles.highlight}>{leg.duration.text}</span>
        </li>
      </ul>
    </div>
  )
}
