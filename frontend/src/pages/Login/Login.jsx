import styles from "./styles.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

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
      setErrorMessage("")
      navigate("/myLibrary");

    } catch(error) {
      console.error("Erro no Login: ", error)
      if(error.response?.status === 400) {
        setErrorMessage("Email ou senha incorretos")
      } else {
        setErrorMessage("Erro ao tentar fazer login. Tente novamente mais tarde.")
      }
    }
  }

  return(
    <div className={styles.wrapper}>
      <Link to="/" className={styles.backButton}>← Início</Link>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* <Link to="/passwordRecovery" className={styles.forgotPass}>Esqueci minha senha</Link> */}
          <button type="submit">Entrar</button>
          <Link to="/createAccount" className={styles.createAccount}>Não tem uma conta? Crie uma aqui!</Link>
        </form>
      </div>
    </div>
  )
}