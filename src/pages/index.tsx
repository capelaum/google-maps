import { Map } from 'components/Map'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wildfire Tracker</title>
        <meta name="description" content="Wildfire Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map />
    </div>
  )
}

export default Home
