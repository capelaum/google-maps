import { GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DirectionsResult,
  LatLngLiteral,
  Location,
  MapOptions
} from 'types/googleMaps'
import { fetchDirections, generateRandomLocations } from 'utils/functions'
import { defaultCenter, mapOptions } from 'utils/options'
import { Circles } from './Circles'
import { Directions } from './Directions'
import { MarkerList } from './MakerList'
import { MarkerInfo } from './MarkerInfo.jsx'
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'

export default function Map() {
  const [directions, setDirections] = useState<DirectionsResult>()
  const [location, setLocation] = useState<Location>()
  const [showOverlay, setShowOverlay] = useState(false)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)

  const mapRef = useRef<GoogleMap>()

  // const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo<MapOptions>(() => mapOptions, [])

  const handleSetLocation = useCallback((location: Location) => {
    if (location) {
      setLocation(location)
      mapRef.current?.panTo(location.position)
    }
  }, [])

  useEffect(() => {
    if (location) {
      setCenter(location.position)
    }
  }, [location])

  const toggleOverlay = useCallback(
    () => setShowOverlay(!showOverlay),
    [showOverlay]
  )

  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const randomLocations = useMemo(
    () => generateRandomLocations(center),
    [center]
  )

  return (
    <div className={styles.container}>
      <Sidebar
        handleSetLocation={handleSetLocation}
        directions={directions}
        location={location}
      />

      <div className={styles.map}>
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName={styles.mapContainer}
          options={options}
          onLoad={onLoad}
        >
          {directions && <Directions directions={directions} />}

          {location && (
            <>
              <Marker
                position={location.position}
                icon={'/marker.png'}
                onClick={toggleOverlay}
              />

              <MarkerList
                locations={randomLocations}
                fetchDirections={fetchDirections}
                location={location}
                setDirections={setDirections}
              />

              <MarkerInfo
                position={location.position}
                description={location.description}
                showOverlay={showOverlay}
              />

              <Circles position={location.position} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
