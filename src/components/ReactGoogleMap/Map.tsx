import { GoogleMap } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  Location,
  MapMouseEvent,
  MapOptions,
} from 'types/googleMaps'
import { defaultCenter, mapOptions } from 'utils/options'
import { Directions } from './Directions'
import { MarkerLocation } from './Marker'
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'

export default function Map() {
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult>()
  const [location, setLocation] = useState<Location>()

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
    setDirections(undefined)
  }, [])

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
          <MarkerLocation location={location} setDirections={setDirections} />
        )}
      </GoogleMap>
    </div>
  )
}
