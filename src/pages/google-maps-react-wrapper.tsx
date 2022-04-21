import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Form } from 'components/GoogleMaps/Form'
import { Map } from 'components/GoogleMaps/Map'
import { Marker } from 'components/GoogleMaps/Marker'
import { Loader } from 'components/Shared/Loader'
import Head from 'next/head'
import { ReactElement, useMemo, useState } from 'react'
import styles from 'styles/googleWrapper.module.scss'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
} from 'types/googleMaps'
import { fetchDirections, generateRandomLocations } from 'utils/functions'
import { defaultCenter, mapOptions } from 'utils/options'

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <div>Error</div>
  return <Loader />
}

export default function App() {
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [marker, setMarker] = useState<LatLngLiteral | null>(null)
  const [directions, setDirections] = useState<DirectionsResult | undefined>()

  const options = useMemo<MapOptions>(() => mapOptions, [])

  const randomLocations = useMemo(
    () => generateRandomLocations(marker ?? defaultCenter, 20),
    [marker]
  )

  const iconBase =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/'

  const placeMarker = (e: MapMouseEvent) => {
    const { latLng } = e

    setDirections(undefined)

    setMarker({ lat: latLng!.lat(), lng: latLng!.lng() })
  }

  const onIdle = (m: GoogleMapsMap) => {
    console.log('onIdle')
    setZoom(m.getZoom()!)
    setCenter(m.getCenter()!.toJSON())
  }

  const handleCreateDirections = async (destination: LatLngLiteral) => {
    if (!marker) return

    const directionsResult = await fetchDirections(marker, destination)

    setDirections(directionsResult)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Maps Wrapper</title>
        <meta name="description" content="Google Maps Wrapper" />
      </Head>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        render={render}
      >
        <Map
          center={center}
          onClick={placeMarker}
          onIdle={onIdle}
          zoom={zoom}
          directions={directions}
          {...options}
        >
          {marker && <Marker position={marker} icon="/marker.png" />}

          {randomLocations.map((location) => {
            return (
              <Marker
                key={JSON.stringify(location)}
                position={location}
                handleCreateDirections={handleCreateDirections}
              />
            )
          })}
        </Map>
      </Wrapper>

      <Form
        zoom={zoom}
        center={center}
        marker={marker}
        setZoom={setZoom}
        setCenter={setCenter}
        setMarker={setMarker}
      />
    </div>
  )
}
