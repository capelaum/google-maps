import { GoogleMap } from '@react-google-maps/api'
import { useCallback, useMemo, useRef, useState } from 'react'
import { GoogleMapsMap, LatLngLiteral, MapOptions } from 'types/googleMaps'
import Places from './places'
import styles from './styles.module.scss'

export default function Map() {
  const [office, setOffice] = useState<LatLngLiteral>()
  const mapRef = useRef<GoogleMapsMap>()

  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo<MapOptions>(
    () => ({
      mapId: '2a64e534ec5b7704',
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    }),
    []
  )

  const onLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
    return
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h1>Commute?</h1>
        <Places
          setOffice={(position) => {
            setOffice(position)
            mapRef.current?.panTo(position)
          }}
        />
      </div>
      <div className={styles.map}>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName={styles.mapContainer}
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  )
}
