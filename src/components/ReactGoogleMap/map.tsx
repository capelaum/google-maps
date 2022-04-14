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
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'
import {
  closeOptions,
  farOptions,
  generateHouses,
  middleOptions,
} from './utils/map'

export default function Map() {
  const [directions, setDirections] = useState<DirectionsResult>()
  const [location, setLocation] = useState<Location>()
  const [showOverlay, setShowOverlay] = useState(false)
  const [center, setCenter] = useState<LatLngLiteral>({
    lat: -15.79,
    lng: -47.88,
  })

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
      <Sidebar handleSetLocation={handleSetLocation} directions={directions} />

      <div className={styles.map}>
        <GoogleMap
          zoom={14}
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
                radius={1500}
                options={closeOptions}
              />
              <Circle
                center={location.position}
                radius={3000}
                options={middleOptions}
              />
              <Circle
                center={location.position}
                radius={4500}
                options={farOptions}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
