import { useState } from 'react'
import { LatLngLiteral } from 'types/googleMaps'
import styles from './styles.module.scss'

interface CurrentLocationProps {
  moveToCurrentLocation: (position: LatLngLiteral) => void
}

export function CurrentLocation({
  moveToCurrentLocation,
}: CurrentLocationProps) {
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
    >
      {disabled ? 'Loading...' : 'Get Current Location'}
    </button>
  )
}
