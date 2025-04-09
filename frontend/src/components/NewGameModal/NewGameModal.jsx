import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import api from "../../services/api";

export default function NewGameModal({ isOpen, onClose }) {
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [toc, setToc] = useState("");
  const [note, setNote] = useState("");
  const [recommended, setRecommended] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const resetForm = () => {
    setName("");
    setExperience("");
    setToc("");
    setNote("");
    setSelectedGame(null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (name.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      try {
        const response = await api.get(`/games/search?query=${name}`);
        setSuggestions(response.data.results.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        setShowSuggestions(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [name]);

  const handleSuggestionClick = (game) => {
    setName(game.name);
    setSelectedGame(game);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGame) {
      alert("Selecione um jogo da lista de sugestões.");
      return;
    }

    const token = localStorage.getItem("token");

    const newGameData = {
      rawg_id: selectedGame.id,
      name: selectedGame.name,
      image_url: selectedGame.background_image,
      platform: selectedGame.platforms?.map((p) => p.platform.name).join(", "),
      genre: selectedGame.genres?.map((g) => g.name).join(", "),
      description: selectedGame.slug || "Sem descrição disponível",
      experience,
      completion_time: toc,
      recommended,
      rating: Number(note),
    };

    try {
      await api.post("/games/add", newGameData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Jogo adicionado com sucesso!");
      resetForm();
      onClose();

    } catch (error) {
      console.error("Erro ao adicionar jogo:", error);
      alert("Erro ao adicionar jogo. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backgroundModal} onClick={() => {onClose(), resetForm()}}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={() => {onClose(), resetForm()}}>
          X
        </button>
        <h2>Adicionar Novo Jogo</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nameGame">Digite o nome do jogo:</label>
            <input
              type="text"
              id="nameGame"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className={styles.suggestionBox} ref={suggestionRef}>
                {suggestions.map((game) => (
                  <li
                    key={game.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSuggestionClick(game);
                    }}
                  >
                    {game.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="experience">Como foi sua experiência?</label>
            <input
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="toc">Tempo de conclusão (horas)</label>
            <input
              type="text"
              id="toc"
              value={toc}
              onChange={(e) => setToc(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="note">Nota Geral (1 - 5)</label>
            <input
              type="number"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              min={1}
              max={5}
              step={0.1}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                checked={recommended}
                onChange={(e) => setRecommended(e.target.checked)}
              />
              Você recomendaria este jogo?
            </label>
          </div>

          <button className={styles.addGame}>Adicionar</button>
        </form>
      </div>
    </div>
  );
}
