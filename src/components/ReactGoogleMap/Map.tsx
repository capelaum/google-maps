import { GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  Location,
  MapOptions,
} from 'types/googleMaps'
import { fetchDirections, generateRandomLocations } from 'utils/functions'
import { defaultCenter, mapOptions } from 'utils/options'
import { Circles } from './Circles'
import { Directions } from './Directions'
import { MarkerList } from './MakerList'
import { MarkerInfo } from './MarkerInfo'
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'

export default function Map() {
  const [directions, setDirections] = useState<DirectionsResult>()
  const [location, setLocation] = useState<Location>()
  const [showOverlay, setShowOverlay] = useState(false)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [zoom, setZoom] = useState(14)

  const mapRef = useRef<GoogleMapsMap>()

  const options = useMemo<MapOptions>(() => mapOptions, [])

  const handleSetLocation = useCallback(
    (location: Location) => {
      if (location) {
        setLocation(location)
        mapRef.current?.panTo(location.position)
        if (directions) {
          setDirections(undefined)
        }
      }
    },
    [directions]
  )

  useEffect(() => {
    if (location) {
      setCenter(location.position)
    }
  }, [location])

  const toggleOverlay = useCallback(
    () => setShowOverlay(!showOverlay),
    [showOverlay]
  )

  const onIdle = () => {
    console.log('onIdle')
    setZoom(mapRef.current?.getZoom()!)
    setCenter(mapRef.current!.getCenter()!.toJSON())
  }

  const onLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
  }, [])

  const randomLocations = useMemo(
    () => generateRandomLocations(location?.position ?? defaultCenter),
    [location]
  )

  return (
    <div className={styles.container}>
      <Sidebar
        handleSetLocation={handleSetLocation}
        directions={directions}
        location={location}
        center={center}
        zoom={zoom}
      />

      <div className={styles.map}>
        <GoogleMap
          onIdle={onIdle}
          zoom={zoom}
          center={center}
          options={options}
          onLoad={onLoad}
          mapContainerClassName={styles.mapContainer}
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
              >
                <div
                  className={styles.marker}
                  style={{ display: showOverlay ? 'block' : 'none' }}
                >
                  <h2>{location.description}</h2>
                </div>
              </MarkerInfo>

              <Circles position={location.position} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
