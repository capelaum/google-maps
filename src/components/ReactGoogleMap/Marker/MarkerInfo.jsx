import { InfoWindow } from '@react-google-maps/api'
import styles from './styles.module.scss'

/* interface MarkerInfoProps {
  position: LatLngLiteral
  description: string
  showOverlay: boolean
} */

export function MarkerInfo({ position, description = null }) {
  return (
    <InfoWindow position={position}>
      <div className={styles.markerInfo}>
        {description && <h2>{description}</h2>}
      </div>
    </InfoWindow>
  )
}
