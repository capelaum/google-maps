import { DirectionsResult, Location } from 'types/googleMaps'
import Distance from './distance'
import Places from './places'
import styles from './styles.module.scss'

interface SidebarProps {
  handleSetLocation: (location: Location) => void
  directions: DirectionsResult | undefined
}

export function Sidebar({ handleSetLocation, directions }: SidebarProps) {
  return (
    <div className={styles.controls}>
      <h1>Trajeto</h1>
      <Places handleSetLocation={handleSetLocation} />
      {!location && <p>Enter the address of your destination</p>}

      {directions && <Distance leg={directions.routes[0].legs[0]} />}
    </div>
  )
}