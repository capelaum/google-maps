import { InfoWindow } from '@react-google-maps/api'
import styles from './styles.module.scss'

export function MarkerInfo({ position, children, onCloseClick }) {
  return (
    <InfoWindow position={position} onCloseClick={onCloseClick}>
      <div className={styles.markerInfo}>{children}</div>
    </InfoWindow>
  )
}
