import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <MdOutlineLocalFireDepartment size={22} color="var(--color-red-500)" />
        Wildfire Tracker (Powered By NASA)
      </h1>
    </header>
  )
}
