import styles from "./styles.module.css"

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Checkpoint</h1>
      <nav className={styles.nav}>
        <a href="/createAccount" className={styles.navLink}>Create Account</a>
        <a href="/login" className={styles.navLink}>Login</a>
      </nav>
    </div>
  )
}