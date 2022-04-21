import { Button } from 'components/Shared/Button'
import { DirectionsResult, LatLngLiteral } from 'types/googleMaps'
import { Distance } from './Distance'
import { Places } from './Places'
import styles from './styles.module.scss'

interface SidebarProps {
  clearLocation: () => void
  handleSetClickedPos: (pos: LatLngLiteral) => void
  directions: DirectionsResult | null
  clickedPos: LatLngLiteral | null
  zoom: number
  center: LatLngLiteral
}

export function Sidebar({
  clearLocation,
  handleSetClickedPos,
  directions,
  clickedPos,
  center,
  zoom,
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <Places
        clickedPos={clickedPos}
        handleSetClickedPos={handleSetClickedPos}
      />

      {!clickedPos && <p>Busque um local</p>}

      {directions && <Distance leg={directions.routes[0].legs[0]} />}

      <div className={styles.locationInfo}>
        {clickedPos && (
          <>
            <h2>Localização</h2>
            <p>Latitude: {clickedPos?.lat.toFixed(3)}</p>
            <p>Longitude: {clickedPos?.lng.toFixed(3)}</p>

            <Button onClick={clearLocation} className={styles.buttonClear}>
              Limpar Local
            </Button>
          </>
        )}

        <hr />

        <div>
          <h2>Centro</h2>
          <p>Latitude: {center.lat.toFixed(3)}</p>
          <p>Longitude: {center.lng.toFixed(3)}</p>
          <p>Zoom: {zoom.toFixed(3)}</p>
        </div>
      </div>

      <Button className={styles.buttonBack} href="/">
        Voltar
      </Button>
    </div>
  )
}
