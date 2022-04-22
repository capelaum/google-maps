import { useMap } from 'contexts/mapContext'
import { useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { BallTriangle } from 'react-loader-spinner'
import { LatLngLiteral } from 'types/googleMaps'
import styles from './styles.module.scss'

interface CurrentLocationProps {
  moveToCurrentLocation: (position: LatLngLiteral) => void
}

export function CurrentLocation() {
  const { moveToCurrentLocation } = useMap()
  const [disabled, setDisabled] = useState(false)

  const handleOnClick = () => {
    setDisabled(true)

    navigator.geolocation.getCurrentPosition((position) => {
      setDisabled(false)

      moveToCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }

  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={handleOnClick}
      title="Localização atual"
    >
      {disabled ? (
        <BallTriangle
          width={24}
          height={24}
          color="white"
          ariaLabel="loading-indicator"
        />
      ) : (
        <BiCurrentLocation size={24} />
      )}
    </button>
  )
}
