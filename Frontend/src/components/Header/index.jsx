import styles from "./styles.module.css"

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Checkpoint</h1>
      <nav className={styles.nav}>
        <a href="" className={styles.navLink}>Sign in</a>
        <a href="" className={styles.navLink}>Login</a>
        <a href="" className={styles.navLink}>About</a>
      </nav>
    </div>
  )
}