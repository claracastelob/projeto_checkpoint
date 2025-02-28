import styles from "./styles.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import NewGameModal from "../../components/NewGameModal/NewGameModal"
import { useState } from "react"

export default function Configuration() {
  const [openModal, setOpenModal] = useState(false)

  return(
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Configurações</h1>
          <button className={styles.newGameButton} onClick={() => setOpenModal(true)}>Novo Jogo</button>
        </div>
        <div className={styles.configurations}>
          <label htmlFor="username" className={styles.label}>Alterar Usuário</label>
          <div className={styles.inputContainer}>
            <input type="text" id="username" className={styles.inputs} />
            <button className={styles.btns}>Alterar</button>
          </div>

          <label htmlFor="email" className={styles.label}>Alterar E-mail</label>
          <div className={styles.inputContainer}>
            <input type="text" id="email" className={styles.inputs} />
            <button className={styles.btns}>Alterar</button>
          </div>
          
          <label htmlFor="password" className={styles.label}>Alterar Senha</label>
          <div className={styles.inputContainer}>
            <input type="text" id="password" className={styles.inputs} />
            <button className={styles.btns}>Alterar</button>
          </div>
        </div>
      </main>
      <NewGameModal isOpen={openModal} onClose={() => setOpenModal(false)}/>
    </div>
  )
}