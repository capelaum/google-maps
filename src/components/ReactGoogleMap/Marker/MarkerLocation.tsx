import { Marker } from '@react-google-maps/api'
import { useCallback, useMemo, useState } from 'react'
import { DirectionsResult, Location } from 'types/googleMaps'
import { fetchDirections, generateRandomLocations } from 'utils/functions'
import { defaultCenter } from 'utils/options'
import { MarkerCircles } from './MarkerCircles'
import { MarkerInfo } from './MarkerInfo'
import { MarkerList } from './MarkerList'

interface MarkerLocationProps {
  location: Location
  setDirections: (directions: DirectionsResult) => void
}

export function MarkerLocation({
  location,
  setDirections,
}: MarkerLocationProps) {
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleOverlay = useCallback(
    () => setShowOverlay(!showOverlay),
    [showOverlay]
  )

  const randomLocations = useMemo(
    () => generateRandomLocations(location?.position ?? defaultCenter),
    [location]
  )

  return (
    <>
      <Marker
        position={location.position}
        icon={{
          url: '/marker.png',
          scaledSize: new window.google.maps.Size(30, 45),
        }}
        onClick={toggleOverlay}
      />

      <MarkerList
        locations={randomLocations}
        fetchDirections={fetchDirections}
        location={location}
        setDirections={setDirections}
      />

      <MarkerInfo
        position={location.position}
        description={location.description}
        showOverlay={showOverlay}
      />

      <MarkerCircles position={location.position} />
    </>
  )
}
