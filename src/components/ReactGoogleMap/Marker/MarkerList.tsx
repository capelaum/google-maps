import { Marker, MarkerClusterer } from '@react-google-maps/api'
import { useCallback } from 'react'
import { DirectionsResult, LatLngLiteral, Location } from 'types/googleMaps'

interface MarkerListProps {
  locations: LatLngLiteral[]
  location: Location
  fetchDirections: (
    position: LatLngLiteral,
    destination: LatLngLiteral
  ) => Promise<DirectionsResult | undefined>
  setDirections: (directions: DirectionsResult) => void
}

export function MarkerList({
  locations,
  location,
  fetchDirections,
  setDirections,
}: MarkerListProps) {
  const handleFetchDirections = useCallback(
    async (position: LatLngLiteral) => {
      const directionsResult = await fetchDirections(
        position,
        location.position
      )

      setDirections(directionsResult!)
    },
    [fetchDirections, location, setDirections]
  )

  return (
    <MarkerClusterer>
      {(clusterer) =>
        locations.map((position) => (
          <Marker
            key={position.lat}
            position={position}
            clusterer={clusterer}
            onClick={() => handleFetchDirections(position)}
          />
        ))
      }
    </MarkerClusterer>
  )
}
