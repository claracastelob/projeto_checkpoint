import styles from "./styles.module.css"

export default function PasswordRecovery() {
  return(
    <div className={styles.wrapper}>
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