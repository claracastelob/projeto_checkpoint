import styles from "./styles.module.css"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Checkpoint</h1>
      <nav className={styles.nav}>
        <Link to="/createAccount" className={styles.navLink}>Criar Conta</Link>
        <Link to="/login" className={styles.navLink}>Entrar</Link>
      </nav>
    </div>
  )
}