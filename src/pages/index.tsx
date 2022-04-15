import { Button } from 'components/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'styles/Home.module.scss'

const maps = [
  {
    name: 'Google Map React',
    href: '/google-map-react',
  },
  {
    name: 'Google Maps React Wrapper',
    href: '/google-maps-react-wrapper',
  },
  {
    name: 'React Google Maps',
    href: '/react-google-maps',
  },
]

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Google Maps | Home</title>
        <meta name="description" content="React Google Maps | Home" />
      </Head>

      <h1>Home</h1>

      <div className={styles.buttonsContainer}>
        {maps.map(({ name, href }) => (
          <Button key={name} className={styles.buttonContainer} href={href}>
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Home
