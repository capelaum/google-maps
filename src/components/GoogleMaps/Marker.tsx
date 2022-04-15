import { useEffect, useState } from 'react'
import { LatLngLiteral, MarkerOptions, MarkerType } from 'types/googleMaps'

interface MarkerPros extends MarkerOptions {
  handleCreateDirections?: (destination: LatLngLiteral) => Promise<void>
}

export const Marker: React.FC<MarkerPros> = ({
  handleCreateDirections,
  ...options
}) => {
  const [marker, setMarker] = useState<MarkerType>()

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      ;['click'].forEach((eventName) =>
        google.maps.event.clearListeners(marker, eventName)
      )

      if (handleCreateDirections) {
        marker.addListener('click', (marker) =>
          handleCreateDirections(marker.latLng)
        )
      }
    }
  }, [marker, handleCreateDirections])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}
