import styles from "./styles.module.css"

export default function ConfigurationsModal({isOpen, onClose, onConfirm}) {

  if(isOpen) {
    return (
      <div className={styles.backgroundModal} onClick={onClose}>
        <div className={styles.container}>
          <h2>Confirmação</h2>
          <form action="">
            <p>Você tem certeza que deseja fazer essa alteração?</p>
            <button onClick={onConfirm} className={styles.updateBtn} type="submit">Sim, alterar meus dados</button>
            <button className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
          </form>

        </div>
      </div>
    )
  }

  return null
}