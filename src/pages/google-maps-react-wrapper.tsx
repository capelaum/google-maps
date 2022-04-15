import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Form } from 'components/GoogleMaps/Form'
import { Map } from 'components/GoogleMaps/Map'
import { Marker } from 'components/GoogleMaps/Marker'
import { Loader } from 'components/Loader'
import Head from 'next/head'
import { ReactElement, useMemo, useState } from 'react'
import styles from 'styles/googleWrapper.module.scss'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLng,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
} from 'types/googleMaps'
import { generateHouses } from 'utils/functions'
import { defaultCenter, mapOptions } from 'utils/options'

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <div>Error</div>
  return <Loader />
}

export default function App() {
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [marker, setMarker] = useState<LatLng | null>(null)
  const [zoom, setZoom] = useState(14)

  const [directions, setDirections] = useState<DirectionsResult>()

  const options = useMemo<MapOptions>(() => mapOptions, [])
  const randomLocations = useMemo(() => generateHouses(center, 20), [center])

  const placeMarker = (e: MapMouseEvent) => {
    setMarker(e.latLng!)
  }

  const onIdle = (m: GoogleMapsMap) => {
    console.log('onIdle')
    setZoom(m.getZoom()!)
    setCenter(m.getCenter()!.toJSON())
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
          {...options}
        >
          {marker && <Marker position={marker} />}

          {randomLocations.map((location) => {
            return <Marker key={JSON.stringify(location)} position={location} />
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
