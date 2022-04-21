import { Marker } from '@react-google-maps/api'
import { DirectionsResult, LatLngLiteral } from 'types/googleMaps'
import { MarkerCircles } from './MarkerCircles'
import { MarkerList } from './MarkerList'

interface MarkerLocationProps {
  clickedPos: LatLngLiteral | null
  setDirections: (directions: DirectionsResult) => void
}

export function MarkerLocation({
  clickedPos,
  setDirections,
}: MarkerLocationProps) {
  return (
    <>
      <Marker
        position={clickedPos!}
        icon={{
          url: '/marker.svg',
          scaledSize: new window.google.maps.Size(30, 45),
        }}
      />

      <MarkerList clickedPos={clickedPos} setDirections={setDirections} />

      <MarkerCircles position={clickedPos!} />
    </>
  )
}
