import styles from "./styles.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import GameCard from "../../components/GameCard/GameCard"

const games = [
  {id: 1, name: "Avowed", img: "avowed"},
  {id: 2, name: "Civilization VI", img: "civi"},
  {id: 3, name: "Crash Bandicoot", img: "imagem"},
  {id: 4, name: "Dishonored 2", img: "imagem"},
  {id: 5, name: "Far Cry 3", img: "imagem"},
  {id: 6, name: "GTA IV", img: "imagem"},
  {id: 7, name: "The Sims 2", img: "imagem"},
  {id: 8, name: "Zelda: Ocarina of Time", img: "imagem"},
]


export default function MainPage() {
  return(
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Início</h1>
          <button className={styles.newGameButton}>Novo Jogo</button>
        </div>
        <div className={styles.gameGrid}>
          {games.map((game) => (
            <GameCard key={game.id} name={game.name} img={game.img}/>
          ))}
        </div>
      </main>
    </div>
  )
}