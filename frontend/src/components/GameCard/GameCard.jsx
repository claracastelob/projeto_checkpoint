import styles from "./styles.module.css"

export default function GameCard({name, image_url, rating, recommended, onClick}) {
  return(
    <div className={styles.gamecard} onClick={onClick}>
      <img src={image_url} alt={name} className={styles.image} />
      <p>{name}</p>
      <p>{recommended ? "Recomendado ✅" : "Não recomendado ❌"}</p>
      <p className={styles.rating}>Nota: <span>{rating.toFixed(1)}</span></p>
    </div>
  )
}