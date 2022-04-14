import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Form } from 'components/GoogleMaps/Form'
import { Map } from 'components/GoogleMaps/Map'
import { Marker } from 'components/GoogleMaps/Marker'
import { Loader } from 'components/Loader'
import Head from 'next/head'
import { ReactElement, useMemo, useState } from 'react'
import styles from 'styles/googleWrapper.module.scss'
import {
  GoogleMapsMap,
  LatLng,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
} from 'types/googleMaps'

export default function App() {
  const [marker, setMarker] = useState<LatLng | null>(null)
  const [zoom, setZoom] = useState(14) // initial zoom
  const [center, setCenter] = useState<LatLngLiteral>({
    lat: -15.79,
    lng: -47.88,
  })

  const options = useMemo<MapOptions>(
    () => ({
      mapId: '2a64e534ec5b7704',
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    }),
    []
  )

  const placeMarker = (e: MapMouseEvent) => {
    setMarker(e.latLng!)
  }

  const onIdle = (m: GoogleMapsMap) => {
    console.log('onIdle')
    setZoom(m.getZoom()!)
    setCenter(m.getCenter()!.toJSON())
  }

  const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE) return <div>Error</div>
    return <Loader />
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
