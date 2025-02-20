import styles from "./styles.module.css"
import profile from "../../assets/profile.png"

export default function Sidebar() {
  return(
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={profile} alt="" />
      </div>
      <nav className={styles.nav}>
        <a href="/myLibrary" className={styles.navLink}>Minha Biblioteca</a>
        <a href="/configurations" className={styles.navLink}>Configurações</a>
      </nav>
      <button className={styles.logout}>Logout</button>
    </aside>
  )
}