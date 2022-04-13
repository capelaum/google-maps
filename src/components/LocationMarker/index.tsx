import { MdOutlineLocalFireDepartment } from 'react-icons/md'

interface LocationMarkerProps {
  lat: number
  lng: number
  onClick?: () => void
}

export function LocationMarker({ lat, lng, onClick }: LocationMarkerProps) {
  return (
    <div onClick={onClick}>
      <MdOutlineLocalFireDepartment size={22} color="var(--color-red-500)" />
    </div>
  )
}
