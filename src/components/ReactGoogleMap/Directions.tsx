import { DirectionsRenderer } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'

export function Directions() {
  const { directions } = useMap()

  return (
    <DirectionsRenderer
      directions={directions!}
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
