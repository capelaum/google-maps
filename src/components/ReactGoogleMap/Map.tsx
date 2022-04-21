import { GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
  MarkerType,
} from 'types/googleMaps'
import { defaultCenter, mapOptions } from 'utils/options'
import { CurrentLocation } from './CurrentLocation'
import { Directions } from './Directions'
import { MarkerLocation } from './Marker'
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'

export default function Map() {
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult | null>(null)

  const [clickedPos, setClickedPos] = useState<LatLngLiteral | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null)

  const [currentLocation, setCurrentLocation] =
    useState<LatLngLiteral>(defaultCenter)
  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  const mapRef = useRef<GoogleMapsMap>()

  const options = useMemo<MapOptions>(() => mapOptions, [])

  useEffect(() => {
    if (clickedPos) {
      setCenter(clickedPos)
    }
  }, [clickedPos])

  const handleMapClick = ({ latLng }: MapMouseEvent) => {
    setDirections(null)

    setClickedPos({ lat: latLng!.lat(), lng: latLng!.lng() })
  }

  /* const handleSetLocation = useCallback(
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
  ) */

  const onMarkerClick = (marker: MarkerType) => {
    setSelectedMarker(marker)
  }

  const handleSetClickedPos = (position: LatLngLiteral) => {
    setClickedPos(position)
  }

  const clearLocation = useCallback(() => {
    setClickedPos(null)
    setDirections(null)
  }, [])

  const onIdle = useCallback(() => {
    // console.log('onIdle')

    setZoom(mapRef.current!.getZoom()!)
    setCurrentCenter(mapRef.current!.getCenter()!.toJSON())
  }, [])

  const onMapLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map

    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng })
        setCenter({ lat, lng })
      }
    )
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = undefined
  }, [])

  const moveToCurrentLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    mapRef.current.setZoom(14)
  }, [])

  return (
    <div className={styles.container}>
      <Sidebar
        handleSetClickedPos={handleSetClickedPos}
        clearLocation={clearLocation}
        directions={directions}
        clickedPos={clickedPos}
        center={currentCenter}
        zoom={zoom}
      />

      <CurrentLocation moveToCurrentLocation={moveToCurrentLocation} />

      <GoogleMap
        zoom={zoom}
        center={center}
        options={options}
        onIdle={onIdle}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapContainerClassName={styles.mapContainer}
      >
        <Marker
          position={currentLocation}
          icon={{
            url: '/currentMarker.png',
            scaledSize: new window.google.maps.Size(20, 20),
          }}
        />

        {directions && <Directions directions={directions} />}

        {clickedPos && (
          <MarkerLocation
            clickedPos={clickedPos}
            setDirections={setDirections}
          />
        )}
      </GoogleMap>
    </div>
  )
}
