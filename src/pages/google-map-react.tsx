import { GoogleMapReactHeader } from 'components/GoogleMapReact/GoogleMapReactHeader'
import { Map } from 'components/GoogleMapReact/Map'
import { Loader } from 'components/Loader'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { NaturalEvent } from 'types/event'

const Home: NextPage = () => {
  const [eventData, setEventData] = useState<NaturalEvent[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)

      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()
      setEventData(events)
      setLoading(false)
    }

    fetchEvents()
  }, [])

  return (
    <>
      <Head>
        <title>Natural Events Tracker</title>
        <meta name="description" content="Natural Events Tracker" />
      </Head>

      <GoogleMapReactHeader eventData={eventData} />

      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </>
  )
}

export default Home
