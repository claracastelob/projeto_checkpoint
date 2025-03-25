import styles from "./styles.module.css"
import profile from "../../assets/profile.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return(
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={profile} alt="" />
      </div>
      <nav className={styles.nav}>
        <Link to="/myLibrary" className={styles.navLink}>Minha Biblioteca</Link>
        <Link to="/configurations" className={styles.navLink}>Configurações</Link>
      </nav>
      <button className={styles.logout} onClick={handleLogout}>Sair</button>
    </aside>
  )
}