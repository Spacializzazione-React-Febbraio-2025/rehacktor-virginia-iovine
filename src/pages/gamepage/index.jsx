import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ToggleFavorite from "../../components/ToggleFavorite";

export default function GamePage() {
  const { game_id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialUrl = `https://api.rawg.io/api/games/${game_id}?key=976e3cf4b3b44a799e4b1a6cd1d4e01f`;

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [game_id]);

  // Messaggio caricamento
  if (loading) return <p className="text-center text-lg">Loading...</p>;

  // Messaggio errore
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the {data.name} page
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-base-200 p-6 rounded-xl shadow-lg">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Uscita: {data.released}</p>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <ToggleFavorite data={data} />
          </div>

          <p className="text-md">⭐ Rating: {data.rating}</p>

          <div className="prose max-w-full">
            <h3>About:</h3>
            <p>{data.description_raw}</p>
          </div>
        </div>

        {/* Game Image */}
        <div className="flex justify-center">
          <img
            src={data.background_image}
            alt={data.name}
            className="rounded-lg max-h-[500px] object-cover shadow"
          />
        </div>
      </div>
    </div>
  );
}
