import { LocationInfoBox } from 'components/GoogleMapReact/LocationInfoBox'
import { LocationMarker } from 'components/GoogleMapReact/LocationMarker'
import GoogleMapReact, { Coords } from 'google-map-react'
import { useState } from 'react'
import { NaturalEvent } from 'types/event'
import styles from './styles.module.scss'

interface MapProps {
  center?: Coords
  zoom?: number
  eventData: NaturalEvent[]
}

export function Map({ center, zoom, eventData }: MapProps) {
  const [event, setEvent] = useState<NaturalEvent | null>(null)

  const defaultProps = {
    center: {
      lat: 42.3265,
      lng: -122.8756,
    },
    zoom: 5,
  }

  const centerCoords = center ?? defaultProps.center
  const zoomInitial = zoom ?? defaultProps.zoom

  const markers = eventData.map((event: NaturalEvent) => {
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
        defaultCenter={centerCoords}
        defaultZoom={zoomInitial}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers}
      </GoogleMapReact>
      {event && <LocationInfoBox {...event} />}
    </div>
  )
}
