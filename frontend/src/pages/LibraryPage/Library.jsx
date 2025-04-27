import styles from "./styles.module.css"
import GameCard from "../../components/GameCard/GameCard"
import NewGameModal from "../../components/NewGameModal/NewGameModal"
import Topbar from "../../components/Topbar/index"
import GameDetailsModal from "../../components/GameDetailsModal/index"
import api from "../../services/api"
import { useState, useEffect } from "react"

export default function Library() {
  const [openModal, setOpenModal] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await api.get("/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setGames(response.data)
    } catch (err) {
      console.error("Erro ao buscar jogos:", err)
    }
  }

  const handleCardClick = (userGame) => {
    setSelectedGame(userGame)
    setShowDetails(true)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const handleDeleteGame = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await api.delete(`/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchGames()
      setShowDetails(false)
    } catch (err) {
      console.error("Erro ao excluir jogo:", err)
    }
  }

  return (
    <div className={styles.container}>
      <Topbar />
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Minha Biblioteca</h1>
          <button className={styles.newGameButton} onClick={() => setOpenModal(true)}>+ Novo Jogo</button>
        </div>

        <div className={styles.gameGrid}>
          {games.map((userGame) => (
            <GameCard
              key={userGame.id}
              name={userGame.game.name}
              image_url={userGame.game.image_url}
              rating={userGame.rating}
              recommended={userGame.recommended}
              onClick={() => handleCardClick(userGame)}
            />
          ))}
        </div>
      </main>

      <NewGameModal isOpen={openModal} onClose={() => setOpenModal(false)} onAddGame={fetchGames} />
      {showDetails && (
        <GameDetailsModal
          game={selectedGame}
          onClose={() => setShowDetails(false)}
          onDelete={() => handleDeleteGame(selectedGame.id)}
        />
      )}
    </div>
  )
}
