import { RotatingLines } from 'react-loader-spinner'
import styles from './styles.module.scss'

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <RotatingLines
        width="100"
        strokeColor="var(--color-red-500)"
        strokeWidth="2"
      />
      <h1 className={styles.title}>Fetching Data...</h1>
    </div>
  )
}
