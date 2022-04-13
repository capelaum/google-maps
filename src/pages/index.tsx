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

      <Button>
        <Link href="/google-map-react">
          <a>Google Map React</a>
        </Link>
      </Button>
    </div>
  )
}

export default Home
