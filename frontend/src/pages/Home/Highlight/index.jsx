import styles from "./styles.module.css"

export default function Highlight(props) {
  return (
    <section className={styles.gamesList}>
      <img src={props.img} alt={props.text} />
      <section className={styles.gameInfo}>
        <h4>{props.gameName}</h4>
        <p>{props.gameCategory}</p>
        <p>{props.gameDuration}</p>
        <p className={styles.description}>{props.gameDescription}</p>
      </section>
    </section>
  )
}