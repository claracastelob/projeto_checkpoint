import { useState } from "react"
import { Link } from "react-router-dom";
import styles from "./styles.module.css"
import api from "../../services/api"

export default function CreateAccount() {
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("");
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleRegister(event) {
    event.preventDefault()
    setErrorMessage("")

    if(email !== confirmEmail) {
      setErrorMessage("Os e-mails não coincidem")
      return;
    }

    try {
      const response = await api.post("/users/", {
        user,
        email,
        password
      });

      window.location.href = "/login";
    } catch(error) {
      if(error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.detail)
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    }
  }

  return(
    <div>
      <div className={styles.wrapper}>
      <Link to="/" className={styles.backButton}>← Início</Link>
            <div className={styles.container}>
              <h2>Criar uma Conta</h2>
              <form onSubmit={handleRegister}>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <label htmlFor="username">Usuário</label>
                <input type="text" id="username" value={user} onChange={(e) => setUser(e.target.value)} required />
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="emailConfirm">Confirmação de E-mail</label>
                <input type="email" id="emailConfirm" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
    </div>
  )
}