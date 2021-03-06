import { Button } from 'components/Shared/Button'
import { LatLngLiteral } from 'types/googleMaps'
import styles from './styles.module.scss'

interface FormProps {
  zoom: number
  center: LatLngLiteral
  marker: LatLngLiteral | null
  setZoom: (zoom: number) => void
  setCenter: (center: LatLngLiteral) => void
  setMarker: (marker: LatLngLiteral | null) => void
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
          <span>{marker.lat}</span>
          <strong>Longitude</strong>
          <span>{marker.lng}</span>
        </>
      )}

      <Button onClick={() => setMarker(null)} className={styles.clearButton}>
        Clear
      </Button>

      <Button className={styles.buttonContainer} href="/">
        Voltar
      </Button>
    </div>
  )
}
