import { InfoWindow } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import styles from './styles.module.scss'

export function MarkerInfo({ children }) {
  const { selectedMarker, setSelectedMarker } = useMap()

  return (
    <InfoWindow
      position={selectedMarker.location}
      onCloseClick={() => setSelectedMarker(null)}
    >
      <div className={styles.markerInfo}>{children}</div>
    </InfoWindow>
  )
}
