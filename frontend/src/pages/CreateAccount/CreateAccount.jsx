import styles from "./styles.module.css"

export default function CreateAccount() {
  return(
    <div>
      <div className={styles.wrapper}>
            <div className={styles.container}>
              <h2>Criar uma Conta</h2>
              <form>
                <label htmlFor="username">Usuário</label>
                <input type="text" id="username" required />
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" required />
                <label htmlFor="emailConfirm">Confirmação de E-mail</label>
                <input type="email" id="emailConfirm" required />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" required />
                <button>Enviar</button>
              </form>
            </div>
          </div>
    </div>
  )
}