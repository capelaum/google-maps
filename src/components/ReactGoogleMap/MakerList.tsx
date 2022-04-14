import { Marker, MarkerClusterer } from '@react-google-maps/api'
import { LatLngLiteral } from 'types/googleMaps'

interface MarkerListProps {
  locations: LatLngLiteral[]
  fetchDirections: (house: LatLngLiteral) => void
}

export function MarkerList({ locations, fetchDirections }: MarkerListProps) {
  return (
    <MarkerClusterer>
      {(clusterer) =>
        locations.map((house) => (
          <Marker
            key={house.lat}
            position={house}
            clusterer={clusterer}
            onClick={() => {
              fetchDirections(house)
            }}
          />
        ))
      }
    </MarkerClusterer>
  )
}
