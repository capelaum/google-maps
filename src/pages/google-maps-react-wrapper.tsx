import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Button } from 'components/Button'
import { Form } from 'components/GoogleMaps/Form'
import { Map } from 'components/GoogleMaps/Map'
import { Marker } from 'components/GoogleMaps/Marker'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from 'styles/googleWrapper.module.scss'
import {
  GoogleMapsMap,
  LatLng,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
} from 'types/googleMaps'

const render = (status: Status) => {
  return <h1>{status}</h1>
}

export default function App() {
  const [location, setLocation] = useState<LatLng | null>(null)
  const [zoom, setZoom] = useState(3) // initial zoom
  const [center, setCenter] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
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

  const onClick = (e: MapMouseEvent) => {
    setLocation(e.latLng!)
  }

  const onIdle = (m: GoogleMapsMap) => {
    console.log('onIdle')
    setZoom(m.getZoom()!)
    setCenter(m.getCenter()!.toJSON())
  }

  return (
    <div className={styles.container}>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        render={render}
      >
        <Map center={center} onClick={onClick} onIdle={onIdle} zoom={zoom}>
          {location && <Marker key={`${location}`} position={location} />}
        </Map>
      </Wrapper>

      <Form
        zoom={zoom}
        center={center}
        location={location}
        setZoom={setZoom}
        setCenter={setCenter}
        setLocation={setLocation}
      />

      <div className={styles.buttonContainer}>
        <Button>
          <Link href="/">Voltar</Link>
        </Button>
      </div>
    </div>
  )
}
