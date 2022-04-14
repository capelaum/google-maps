import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { Button } from 'components/Button'
import { Form } from 'components/GoogleMaps/Form'
import { Map } from 'components/GoogleMaps/Map'
import { Marker } from 'components/GoogleMaps/Marker'
import Link from 'next/link'
import { useState } from 'react'
import styles from 'styles/googleWrapper.module.scss'

const render = (status: Status) => {
  return <h1>{status}</h1>
}

export default function App() {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = useState(3) // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!])
  }

  const onIdle = (m: google.maps.Map) => {
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
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>

      <Form
        zoom={zoom}
        center={center}
        clicks={clicks}
        setZoom={setZoom}
        setCenter={setCenter}
        setClicks={setClicks}
      />

      <div className={styles.buttonContainer}>
        <Button>
          <Link href="/">Voltar</Link>
        </Button>
      </div>
    </div>
  )
}
