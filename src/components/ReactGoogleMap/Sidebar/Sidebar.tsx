import { Button } from 'components/Shared/Button'
import { useMap } from 'contexts/mapContext'
import { Distance } from './Distance'
import { Places } from './Places'
import styles from './styles.module.scss'

export function Sidebar() {
  const { currentCenter, zoom, place, clickedPos, directions, clearLocation } =
    useMap()

  return (
    <div className={styles.sidebar}>
      <Places />

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
        <p>Latitude: {currentCenter.lat.toFixed(3)}</p>
        <p>Longitude: {currentCenter.lng.toFixed(3)}</p>
        <p>Zoom: {zoom.toFixed(3)}</p>
      </div>

      <Button className={styles.buttonBack} href="/">
        Voltar
      </Button>
    </div>
  )
}
