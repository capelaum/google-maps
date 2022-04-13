import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import styles from './styles.module.scss'

interface LocationMarkerProps {
  lat: number
  lng: number
  onClick?: () => void
}

export function LocationMarker({ lat, lng, onClick }: LocationMarkerProps) {
  return (
    <div onClick={onClick} className={styles.marker}>
      <MdOutlineLocalFireDepartment size={22} color="var(--color-red-500)" />
    </div>
  )
}
