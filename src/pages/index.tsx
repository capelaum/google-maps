import { Button } from 'components/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Google Maps | Home</title>
        <meta name="description" content="React Google Maps | Home" />
      </Head>

      <h1>Home</h1>

      <div className={styles.buttonsContainer}>
        <Button>
          <Link href="/google-map-react">
            <a>Google Map React</a>
          </Link>
        </Button>

        <Button>
          <Link href="/@googlemaps-react-wrapper">
            <a>@Google Map React Wrapper</a>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Home
