import { Loader } from 'components/Loader'
import { Map } from 'components/Map'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  const [eventData, setEventData] = useState([])
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
    <div className={styles.container}>
      <Head>
        <title>Wildfire Tracker</title>
        <meta name="description" content="Wildfire Tracker" />
      </Head>

      {!loading ? <Map /> : <Loader />}
    </div>
  )
}

export default Home
