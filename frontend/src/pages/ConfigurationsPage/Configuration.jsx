import styles from "./styles.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"

export default function Configuration() {
  return(
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Configurations</h1>
          <button className={styles.newGameButton}>Novo Jogo</button>
        </div>
        <div className={styles.configurations}>
          <label htmlFor="username" className={styles.label}>Change Username</label>
          <div className={styles.inputContainer}>
            <input type="text" id="username" className={styles.inputs} />
            <button className={styles.btns}>Change</button>
          </div>

          <label htmlFor="email" className={styles.label}>Change Email</label>
          <div className={styles.inputContainer}>
            <input type="text" id="email" className={styles.inputs} />
            <button className={styles.btns}>Change</button>
          </div>
          
          <label htmlFor="password" className={styles.label}>Change Password</label>
          <div className={styles.inputContainer}>
            <input type="text" id="password" className={styles.inputs} />
            <button className={styles.btns}>Change</button>
          </div>
        </div>
      </main>
    </div>
  )
}