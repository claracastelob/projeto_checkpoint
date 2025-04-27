import styles from "./styles.module.css"
import { Link } from "react-router-dom";

export default function PasswordRecovery() {
  return(
    <div className={styles.wrapper}>
      <Link to="/" className={styles.backButton}>← Início</Link>
      <div className={styles.container}>
        <h2>Recuperação de Senha</h2>
        <form action="">
          <label htmlFor="email">Informe o seu e-mail</label>
          <input type="email" id="email" required />
          <button>Enviar</button>
        </form>
      </div>
    </div>
  )
}