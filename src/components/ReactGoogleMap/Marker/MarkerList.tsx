import { Marker, MarkerClusterer } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { fetchNearbyPlaces } from 'services/api'
import { LatLngLiteral, MarkerType } from 'types/googleMaps'
import { fetchDirections } from 'utils/functions'

export function MarkerList() {
  const { clickedPos, setDirections, setSelectedMarker } = useMap()

  const handleFetchDirections = useCallback(
    async (position: LatLngLiteral) => {
      if (!clickedPos) return null
      const directionsResult = await fetchDirections(position, clickedPos)

      setDirections(directionsResult!)
    },
    [setDirections, clickedPos]
  )

  const {
    data: nearbyPositions,
    isLoading: isLoadingNearbyPositions,
    isError: isErrorNearbyPositions,
  } = useQuery(
    [clickedPos!.lat, clickedPos!.lng],
    () => {
      return fetchNearbyPlaces(clickedPos!.lat, clickedPos!.lng)
    },
    {
      enabled: clickedPos ? true : false,
      refetchOnWindowFocus: false,
    }
  )

  const handleMarkerClick = useCallback(
    async (marker: MarkerType) => {
      setSelectedMarker(marker)
      await handleFetchDirections(marker.location)
    },
    [handleFetchDirections, setSelectedMarker]
  )

  if (isLoadingNearbyPositions) return null

  return (
    <MarkerClusterer>
      {(clusterer) =>
        nearbyPositions?.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.location}
            onClick={() => handleMarkerClick(marker)}
            clusterer={clusterer}
            icon={{
              url: '/marker.svg',
              scaledSize: new google.maps.Size(32, 32),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(16, 16),
            }}
          />
        ))
      }
    </MarkerClusterer>
  )
}
