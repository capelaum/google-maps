import { FaMapMarkerAlt } from 'react-icons/fa'
import { GiBigWave } from 'react-icons/gi'
import { IoMdSnow } from 'react-icons/io'
import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import { RiThunderstormsFill } from 'react-icons/ri'
import { WiVolcano } from 'react-icons/wi'
import styles from './styles.module.scss'

interface LocationMarkerProps {
  lat: number
  lng: number
  category?: string
  onClick?: () => void
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  lat,
  lng,
  category,
  onClick,
}) => {
  function renderNaturalEventIcon() {
    switch (category) {
      case 'Wildfires':
        return <MdOutlineLocalFireDepartment size={18} color="red" />
      case 'Severe Storms':
        return <RiThunderstormsFill size={18} color="yellow" />
      case 'Volcanoes':
        return <WiVolcano size={28} color="firebrick" />
      case 'Snow':
        return <IoMdSnow size={22} color="skyblue" />
      case 'Sea and Lake Ice':
        return <GiBigWave size={22} color="blue" />
      default:
        return <FaMapMarkerAlt size={22} color="#e4e4e4" />
    }
  }

  return (
    <div onClick={onClick} className={styles.marker}>
      {renderNaturalEventIcon()}
    </div>
  )
}
