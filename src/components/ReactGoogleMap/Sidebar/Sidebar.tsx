import { Button } from 'components/Button'
import { DirectionsResult, LatLngLiteral, Location } from 'types/googleMaps'
import styles from '../styles.module.scss'
import { Distance } from './Distance'
import { Places } from './Places'

interface SidebarProps {
  handleSetLocation: (location: Location) => void
  clearLocation: () => void
  directions: DirectionsResult | undefined
  location: Location | undefined
  zoom: number
  center: LatLngLiteral
}

export function Sidebar({
  handleSetLocation,
  clearLocation,
  directions,
  location,
  center,
  zoom,
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <h1>Trajeto</h1>

      <Places handleSetLocation={handleSetLocation} />

      {!location && <p>Digite o seu destino</p>}

      {directions && <Distance leg={directions.routes[0].legs[0]} />}

      <div className={styles.locationInfo}>
        {location && (
          <>
            <h2>Localização</h2>
            <p>Latitude: {location?.position.lat}</p>
            <p>Longitude: {location?.position.lng}</p>
          </>
        )}

        <hr />

        <div>
          <h2>Centro</h2>
          <p>Latitude: {center.lat}</p>
          <p>Longitude: {center.lng}</p>
          <p>Zoom: {zoom}</p>
        </div>
      </div>

      <Button onClick={clearLocation} className={styles.buttonClear}>
        Clear location
      </Button>

      <Button className={styles.buttonBack} href="/">
        Voltar
      </Button>
    </div>
  )
}
