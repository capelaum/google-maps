import { LocationInfoBox } from 'components/GoogleMapReact/LocationInfoBox'
import { LocationMarker } from 'components/GoogleMapReact/LocationMarker'
import GoogleMapReact from 'google-map-react'
import { useState } from 'react'
import { mapOptions } from 'utils/options'
import styles from './styles.module.scss'

export function Map({ eventData }) {
  const [event, setEvent] = useState(null)

  const defaultProps = {
    center: {
      lat: 42.3265,
      lng: -122.8756,
    },
    zoom: 5,
  }

  const markers = eventData.map((event) => {
    const locations = event.geometries.map((location) => {
      return (
        <LocationMarker
          key={`${event.id}-${location.coordinates[0]}-${location.coordinates[1]}`}
          lat={location.coordinates[1]}
          lng={location.coordinates[0]}
          category={event.categories[0].title}
          onClick={() => setEvent(event)}
        />
      )
    })

    return locations
  })

  return (
    <div className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
      >
        {markers}
      </GoogleMapReact>

      {event && <LocationInfoBox {...event} />}
    </div>
  )
}
