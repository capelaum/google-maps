import { Circle } from '@react-google-maps/api'
import { LatLngLiteral } from 'types/googleMaps'
import { closeOptions, farOptions, middleOptions } from 'utils/options'

interface CirclesProps {
  position: LatLngLiteral
}

export function Circles({ position }: CirclesProps) {
  return (
    <>
      <Circle center={position} radius={1500} options={closeOptions} />
      <Circle center={position} radius={3000} options={middleOptions} />
      <Circle center={position} radius={4500} options={farOptions} />
    </>
  )
}
