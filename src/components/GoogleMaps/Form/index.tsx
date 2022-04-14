import { LatLng, LatLngLiteral } from 'types/googleMaps'
import styles from './styles.module.scss'

interface FormProps {
  zoom: number
  center: LatLngLiteral
  location: LatLng | null
  setZoom: (zoom: number) => void
  setCenter: (center: LatLngLiteral) => void
  setLocation: (location: LatLng | null) => void
}

export function Form({
  zoom,
  center,
  location,
  setZoom,
  setCenter,
  setLocation,
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

      <h3>{location ? 'Click on map to add markers' : 'Location'}</h3>

      {location && (
        <pre key={`${location}`}>
          {JSON.stringify(location.toJSON(), null, 2)}
        </pre>
      )}

      <button onClick={() => setLocation(null)}>Clear</button>
    </div>
  )
}
