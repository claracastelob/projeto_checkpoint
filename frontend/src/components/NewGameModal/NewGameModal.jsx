import styles from "./styles.module.css"

export default function NewGameModal({isOpen, onClose}) {

  if(isOpen) {
    return (
      <div className={styles.backgroundModal} onClick={onClose}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={onClose}>X</button>
          <h2>Adicionar Novo Jogo</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="nameGame">Digite o nome do jogo:</label>
              <input type="text" id="nameGame" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="experience">Como foi sua experiência?</label>
              <input type="text" id="experience" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="improve">O que poderia ter sido melhor?</label>
              <input type="text" id="improve" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="toc">Tempo de conclusão (horas)</label>
              <input type="number" id="toc" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="note">Nota Geral (1 - 5)</label>
              <input type="number" id="note" />
            </div>

            <button className={styles.addGame}>Adicionar</button>
          </form>

        </div>
      </div>
    )
  }

  return null
}
