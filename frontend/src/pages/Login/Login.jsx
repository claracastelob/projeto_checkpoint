import styles from "./styles.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", response.data.access_token);

      window.location.href = "/myLibrary";
    } catch(error) {
      console.error("Erro no Login: ", error)
    }
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link to="/passwordRecovery" className={styles.forgotPass}>Esqueci minha senha</Link>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}