import { OverlayView } from '@react-google-maps/api'
import styles from './styles.module.scss'

// interface MarkerInfoProps {
//   position: LatLngLiteral
//   description: string
//   showOverlay: boolean
// }

export function MarkerInfo({ position, description, showOverlay }) {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
      <div
        className={styles.marker}
        style={{ display: showOverlay ? 'block' : 'none' }}
      >
        <h2>{description}</h2>
      </div>
    </OverlayView>
  )
}
