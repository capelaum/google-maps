import { DirectionsLeg } from 'types/googleMaps'
import styles from './styles.module.scss'

const commutesPerYear = 260 * 2
const litresPerKM = 10 / 100
const gasLitreCost = 6.5
const litreCostKM = litresPerKM * gasLitreCost
const secondsPerDay = 60 * 60 * 24

type DistanceProps = {
  leg: DirectionsLeg
}

export default function Distance({ leg }: DistanceProps) {
  console.log('🚀 ~ leg', leg)

  if (!leg.distance || !leg.duration) return null

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  )

  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  )

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

      <p>
        Em um ano você passaria{' '}
        <span className={styles.highlight}>{days} dias</span> dentro do carro
        por um custo de{' '}
        <span className={styles.highlight}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(cost)}
        </span>
      </p>
    </div>
  )
}
