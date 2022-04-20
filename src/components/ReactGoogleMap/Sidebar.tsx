import { Button } from 'components/Button'
import { DirectionsResult, Location } from 'types/googleMaps'
import Distance from './Distance'
import Places from './Places'
import styles from './styles.module.scss'

interface SidebarProps {
  handleSetLocation: (location: Location) => void
  directions: DirectionsResult | undefined
  location: Location | undefined
}

export function Sidebar({
  handleSetLocation,
  directions,
  location,
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <h1>Trajeto</h1>
      <Places handleSetLocation={handleSetLocation} />
      {!location && <p>Digite o seu destino</p>}

      {directions && <Distance leg={directions.routes[0].legs[0]} />}

      <Button className={styles.buttonContainer} href="/">
        Voltar
      </Button>
    </div>
  )
}
