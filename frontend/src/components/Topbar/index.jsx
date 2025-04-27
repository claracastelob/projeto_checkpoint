import styles from "./styles.module.css";
import profile from "../../assets/default.png";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.leftSection}>
        <img src={profile} alt="Perfil" className={styles.avatar} />
        <nav className={styles.nav}>
          <Link to="/myLibrary" className={styles.navLink}>Minha Biblioteca</Link>
          <Link to="/configurations" className={styles.navLink}>Configurações</Link>
        </nav>
      </div>
      <button className={styles.logout} onClick={handleLogout}>Sair</button>
    </header>
  );
}
