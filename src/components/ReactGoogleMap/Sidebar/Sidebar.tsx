import { Button } from 'components/Shared/Button'
import { DirectionsResult, LatLngLiteral } from 'types/googleMaps'
import { Distance } from './Distance'
import { Places } from './Places'
import styles from './styles.module.scss'

interface SidebarProps {
  clearLocation: () => void
  handleSetClickedPos: (pos: LatLngLiteral) => void
  setPlace: (place: string) => void
  place: string | null

  directions: DirectionsResult | null
  clickedPos: LatLngLiteral | null
  zoom: number
  center: LatLngLiteral
}

export function Sidebar({
  clearLocation,
  handleSetClickedPos,
  setPlace,
  place,
  directions,
  clickedPos,
  center,
  zoom,
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <Places handleSetClickedPos={handleSetClickedPos} setPlace={setPlace} />

      {!clickedPos && <p>Busque um local</p>}

      {place && (
        <div className={styles.placeInfo}>
          <h2>Endereço</h2>
          <p>{place}</p>
        </div>
      )}

      {directions && <Distance leg={directions.routes[0].legs[0]} />}

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

      <Button className={styles.buttonBack} href="/">
        Voltar
      </Button>
    </div>
  )
}
