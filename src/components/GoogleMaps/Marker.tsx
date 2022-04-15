import { useEffect, useState } from 'react'
import { MarkerOptions, MarkerType } from 'types/googleMaps'

export const Marker: React.FC<MarkerOptions> = (options) => {
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
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}
