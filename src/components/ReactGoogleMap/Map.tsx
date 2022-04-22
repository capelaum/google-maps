import { GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
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
import { MarkerInfo, MarkerList } from './Marker'
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'

export default function Map() {
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult | null>(null)

  const [clickedPos, setClickedPos] = useState<LatLngLiteral | null>(null)
  const [place, setPlace] = useState<string | null>(null)

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

  const handleSetClickedPos = (position: LatLngLiteral) => {
    setClickedPos(position)
  }

  const clearLocation = useCallback(() => {
    setClickedPos(null)
    setDirections(null)
    setSelectedMarker(null)
    setPlace(null)
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
        place={place}
        setPlace={setPlace}
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

        {clickedPos && <Marker position={clickedPos} />}

        {clickedPos && (
          <MarkerList
            clickedPos={clickedPos}
            setDirections={setDirections}
            setSelectedMarker={setSelectedMarker}
          />
        )}

        {selectedMarker && (
          <MarkerInfo
            position={selectedMarker.location}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <p>
              <strong>{selectedMarker.name}</strong>
            </p>
            <p>{selectedMarker.address}</p>
            {selectedMarker.website && (
              <p>
                <a
                  href={selectedMarker.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedMarker.website} <FiExternalLink size={12} />
                </a>
              </p>
            )}
          </MarkerInfo>
        )}
      </GoogleMap>
    </div>
  )
}
