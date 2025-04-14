import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ data }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((fav) => +fav.game_id === +data.id);

  const handleToggle = () => {
    if (isFavorite) {
      removeFavorite(data.id);
    } else {
      addFavorite(data);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="text-2xl text-error hover:scale-110 transition"
      title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
