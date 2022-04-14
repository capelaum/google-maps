import { Button } from 'components/Button'
import Link from 'next/link'
import { LatLng, LatLngLiteral } from 'types/googleMaps'
import styles from './styles.module.scss'

interface FormProps {
  zoom: number
  center: LatLngLiteral
  marker: LatLng | null
  setZoom: (zoom: number) => void
  setCenter: (center: LatLngLiteral) => void
  setMarker: (marker: LatLng | null) => void
}

export function Form({
  zoom,
  center,
  marker,
  setZoom,
  setCenter,
  setMarker,
}: FormProps) {
  return (
    <div className={styles.form}>
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />

      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />

      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />

      <h3>{marker ? 'Marker' : 'Click on map to add markers'}</h3>

      {marker && (
        <>
          <strong>Latitude</strong>
          <span>{marker.lat()}</span>
          <strong>Longitude</strong>
          <span>{marker.lng()}</span>
        </>
      )}

      <Button onClick={() => setMarker(null)} className={styles.clearButton}>
        Clear
      </Button>

      <div className={styles.buttonContainer}>
        <Button>
          <Link href="/">Voltar</Link>
        </Button>
      </div>
    </div>
  )
}
