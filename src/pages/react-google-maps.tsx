import { useJsApiLoader } from '@react-google-maps/api'
import Map from 'components/ReactGoogleMap/Map'
import { Loader } from 'components/Shared/Loader'
import Head from 'next/head'

export default function ReactGoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  if (!isLoaded) return <Loader />

  return (
    <>
      <Head>
        <title>React Google Maps</title>
        <meta name="description" content="React Google Maps" />
      </Head>
      <Map />
    </>
  )
}
