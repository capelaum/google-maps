import { useLoadScript } from '@react-google-maps/api'
import { Loader } from 'components/Loader'
import Map from 'components/ReactGoogleMap/map'

export default function ReactGoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  if (!isLoaded) return <Loader />

  return (
    <>
      <Map />
    </>
  )
}
