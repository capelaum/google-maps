import { Button } from 'components/Button'
import Link from 'next/link'
import { DirectionsResult, Location } from 'types/googleMaps'
import Distance from './Distance'
import Places from './Places'
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

      <Button className={styles.buttonContainer}>
        <Link href="/">
          <a>Voltar</a>
        </Link>
      </Button>
    </div>
  )
}
