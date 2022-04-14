import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
  OverlayView,
} from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DirectionsResult,
  LatLngLiteral,
  Location,
  MapOptions,
} from 'types/googleMaps'
import Places from './places'
import styles from './styles.module.scss'
import {
  closeOptions,
  farOptions,
  generateHouses,
  middleOptions,
} from './utils/map'

export default function Map() {
  const [center, setCenter] = useState<LatLngLiteral>({ lat: 43, lng: -80 })
  const [directions, setDirections] = useState<DirectionsResult>()
  const [location, setLocation] = useState<Location>({
    position: center,
    description: '',
  })
  const [showOverlay, setShowOverlay] = useState(false)
  const mapRef = useRef<GoogleMap>()

  // const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo<MapOptions>(
    () => ({
      mapId: '2a64e534ec5b7704',
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    }),
    []
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

  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const houses = useMemo(() => generateHouses(center), [center])

  const fetchDirections = (house: LatLngLiteral) => {
    if (!location) return

    const service = new google.maps.DirectionsService()

    service.route(
      {
        origin: house,
        destination: location.position,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result)
        }
      }
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h1>Commute?</h1>
        <Places
          setLocation={(location) => {
            setLocation(location)
            mapRef.current?.panTo(location.position)
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
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#1976d2',
                  strokeOpacity: 1,
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {location && (
            <>
              <Marker
                position={location.position}
                icon={'/marker.png'}
                onClick={toggleOverlay}
                onMouseOut={() => setShowOverlay(false)}
              />

              <MarkerClusterer>
                {(clusterer) =>
                  houses.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house)
                      }}
                    />
                  ))
                }
              </MarkerClusterer>

              <OverlayView
                position={location.position}
                mapPaneName={OverlayView.FLOAT_PANE}
              >
                <div
                  className={styles.marker}
                  style={{ display: showOverlay ? 'block' : 'none' }}
                >
                  <h2>{location.description}</h2>
                </div>
              </OverlayView>

              <Circle
                center={location.position}
                radius={15000}
                options={closeOptions}
              />
              <Circle
                center={location.position}
                radius={30000}
                options={middleOptions}
              />
              <Circle
                center={location.position}
                radius={45000}
                options={farOptions}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
