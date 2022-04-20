import { GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  Location,
  MapMouseEvent,
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
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult>()
  const [location, setLocation] = useState<Location>()
  const [showOverlay, setShowOverlay] = useState(false)

  const mapRef = useRef<GoogleMapsMap>()

  const options = useMemo<MapOptions>(() => mapOptions, [])

  useEffect(() => {
    if (location) {
      setCenter(location.position)
    }
  }, [location])

  const handleMapClick = ({ latLng }: MapMouseEvent) => {
    setDirections(undefined)

    setLocation({
      position: { lat: latLng!.lat(), lng: latLng!.lng() },
      description: 'Local',
    })
  }

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

  const clearLocation = useCallback(() => {
    setLocation(undefined)
  }, [])

  const toggleOverlay = useCallback(
    () => setShowOverlay(!showOverlay),
    [showOverlay]
  )

  const randomLocations = useMemo(
    () => generateRandomLocations(location?.position ?? defaultCenter),
    [location]
  )

  const onIdle = useCallback(() => {
    // console.log('onIdle')

    setZoom(mapRef.current!.getZoom()!)
    setCenter(mapRef.current!.getCenter()!.toJSON())
  }, [])

  const onLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map
  }, [])

  return (
    <div className={styles.container}>
      <Sidebar
        handleSetLocation={handleSetLocation}
        clearLocation={clearLocation}
        directions={directions}
        location={location}
        center={center}
        zoom={zoom}
      />

      <div className={styles.map}>
        <GoogleMap
          onClick={handleMapClick}
          onIdle={onIdle}
          zoom={zoom}
          center={defaultCenter}
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
