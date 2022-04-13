import { LocationMarker } from 'components/LocationMarker'
import GoogleMapReact, { Coords } from 'google-map-react'
import styles from './styles.module.scss'

interface MapProps {
  center?: Coords
  zoom?: number
}

export function Map({ center, zoom }: MapProps) {
  const defaultProps = {
    center: {
      lat: 42.3265,
      lng: -122.8756,
    },
    zoom: 5,
  }

  const centerCoords = center ?? defaultProps.center
  const zoomInitial = zoom ?? defaultProps.zoom

  return (
    <div className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        }}
        defaultCenter={centerCoords}
        defaultZoom={zoomInitial}
      >
        <LocationMarker lat={centerCoords.lat} lng={centerCoords.lng} />
      </GoogleMapReact>
    </div>
  )
}
