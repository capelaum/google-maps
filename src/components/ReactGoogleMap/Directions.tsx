import { DirectionsRenderer } from '@react-google-maps/api'
import { DirectionsResult } from 'types/googleMaps'

interface DirectionsProps {
  directions: DirectionsResult
}

export function Directions({ directions }: DirectionsProps) {
  return (
    <DirectionsRenderer
      directions={directions}
      options={{
        polylineOptions: {
          zIndex: 50,
          strokeColor: '#1976d2',
          strokeOpacity: 1,
          strokeWeight: 5,
        },
      }}
    />
  )
}
