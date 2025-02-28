import styles from "./styles.module.css"

export default function NewGameModal({isOpen, onClose}) {

  if(isOpen) {
    return (
      <div className={styles.backgroundModal} onClick={onClose}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={onClose}>X</button>
          <h2>Adicionar Novo Jogo</h2>
          <form action="">
            <label htmlFor="nameGame">Digite o nome do jogo:</label>
            <input type="text" id="nameGame" />
            <label htmlFor="experience">Como foi sua experiência?</label>
            <input type="text" id="experience" />
            <label htmlFor="improve">O que poderia ter sido melhor?</label>
            <input type="text" id="improve" />
            <label htmlFor="toc">Tempo de conclusão (horas)</label>
            <input type="number" id="toc" />
            <label htmlFor="note">Nota Geral (1 - 5)</label>
            <input type="number" id="note" />
            <button className={styles.addGame}>Adicionar</button>
          </form>

        </div>
      </div>
    )
  }

  return null
}
