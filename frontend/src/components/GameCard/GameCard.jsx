import styles from "./styles.module.css"
import avowed from "../../assets/JogosGameCard/avowed.jpg"
import civi from "../../assets/JogosGameCard/civi6.jpg"
import crash from "../../assets/JogosGameCard/crash.png"
import disho from "../../assets/JogosGameCard/dishonored2.webp"
import farcry from "../../assets/JogosGameCard/fc3.jpg"
import gta from "../../assets/JogosGameCard/gta4.png"
import thesims from "../../assets/JogosGameCard/ts2.jpg"
import zelda from "../../assets/JogosGameCard/zelda.webp"

const images = {
  "Avowed": avowed,
  "Civilization VI": civi,
  "Crash Bandicoot": crash,
  "Dishonored 2": disho,
  "Far Cry 3": farcry,
  "GTA IV": gta,
  "The Sims 2": thesims,
  "Zelda: Ocarina of Time": zelda,
}

export default function GameCard({name, img, rating}) {
  return(
    <div className={styles.gamecard}>
      <img src={images[name]} alt="" />
      <p>{name}</p>
      <p>Tempo de Conclusão: </p>
      <p className={styles.rating}>Nota: <span>{rating.toFixed(1)}</span></p>
    </div>
  )
}