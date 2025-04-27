import styles from "./styles.module.css"

export default function GameDetailsModal({ game, onClose, onDelete }) {
  return (
    <div className={styles.backgroundModal} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <img className={styles.image} src={game.game.image_url} alt={game.game.name} />

        <div className={styles.details}>
          <div className={styles.infoBlock}>
            <span className={styles.label}>Nome</span>
            <span className={styles.value}>{game.game.name}</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.label}>Plataforma</span>
            <span className={styles.value}>{game.game.platform}</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.label}>Gênero</span>
            <span className={styles.value}>{game.game.genre}</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.label}>Tempo de conclusão</span>
            <span className={styles.value}>{game.completion_time}</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.label}>Comentário</span>
            <span className={styles.value}>{game.experience}</span>
          </div>
        </div>

        <button className={styles.deleteButton} onClick={onDelete}>
          Excluir da biblioteca
        </button>
      </div>
    </div>
  )
}
