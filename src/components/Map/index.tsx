import { LocationInfoBox } from 'components/LocationInfoBox'
import { LocationMarker } from 'components/LocationMarker'
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

  const markers = eventData.map((event: any) => {
    if (event.categories[0].id === 8) {
      return (
        <LocationMarker
          key={event.id}
          lat={event.geometries[0].coordinates[1]}
          lng={event.geometries[0].coordinates[0]}
          onClick={() => setEvent(event)}
        />
      )
    }
  })

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
        {markers}
      </GoogleMapReact>
      {event && <LocationInfoBox {...event} />}
    </div>
  )
}
