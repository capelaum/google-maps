import { Marker, MarkerClusterer } from '@react-google-maps/api'
import { useCallback, useMemo } from 'react'
import { DirectionsResult, LatLngLiteral } from 'types/googleMaps'
import { fetchDirections, generateRandomLocations } from 'utils/functions'
import { defaultCenter } from 'utils/options'

interface MarkerListProps {
  clickedPos: LatLngLiteral | null
  setDirections: (directions: DirectionsResult) => void
}

export function MarkerList({ clickedPos, setDirections }: MarkerListProps) {
  const handleFetchDirections = useCallback(
    async (position: LatLngLiteral) => {
      if (!clickedPos) return null
      const directionsResult = await fetchDirections(position, clickedPos)

      setDirections(directionsResult!)
    },
    [setDirections, clickedPos]
  )

  const randomLocations = useMemo(
    () => generateRandomLocations(clickedPos ?? defaultCenter),
    [clickedPos]
  )

  return (
    <MarkerClusterer>
      {(clusterer) =>
        randomLocations.map((position) => (
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
