import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        Ciao👋🏻 {session?.user.user_metadata.first_name}
      </h2>

      <h3 className="text-xl font-semibold mb-4">Questi sono i tuoi giochi preferiti</h3>

      {favorites.length === 0 ? (
        <p>Non hai ancora aggiunto giochi ai preferiti.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((game) => (
            <div
              key={game.game_id}
              className="bg-base-200 rounded-xl p-4 shadow flex flex-col"
            >
              <img
                src={game.game_image}
                alt={game.game_name}
                className="rounded mb-2 w-full h-48 object-cover"
              />
              <h2 className="text-lg font-semibold mb-2">{game.game_name}</h2>
              <button
                className="btn btn-sm btn-error self-end"
                onClick={() => removeFavorite(game.game_id)}
                title="Rimuovi dai preferiti"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
