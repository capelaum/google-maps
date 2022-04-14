import { useLoadScript } from '@react-google-maps/api'
import { Loader } from 'components/Loader'

export default function ReactGoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  if (!isLoaded) return <Loader />

  return (
    <div>
      <h1>Map</h1>
    </div>
  )
}
