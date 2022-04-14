import styles from './styles.module.scss'

interface FormProps {
  zoom: number
  center: google.maps.LatLngLiteral
  clicks: google.maps.LatLng[]
  setZoom: (zoom: number) => void
  setCenter: (center: google.maps.LatLngLiteral) => void
  setClicks: (clicks: google.maps.LatLng[]) => void
}

export function Form({
  zoom,
  center,
  clicks,
  setZoom,
  setCenter,
  setClicks,
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

      <h3>{clicks.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}

      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  )
}
