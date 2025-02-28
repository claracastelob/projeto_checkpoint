import styles from "./styles.module.css"
import { Link } from "react-router-dom";

export default function Login() {
  return(
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form action="">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" required />
          <Link to="/passwordRecovery" className={styles.forgotPass}>Esqueci minha senha</Link>
          <button>Entrar</button>
        </form>
      </div>
    </div>
  )
}