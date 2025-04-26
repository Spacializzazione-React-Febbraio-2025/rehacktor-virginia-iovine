import { useEffect } from "react";
import { useParams } from "react-router";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GamePage() {
  const { game_id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${game_id}?key=976e3cf4b3b44a799e4b1a6cd1d4e01f`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(`https://api.rawg.io/api/games/${game_id}?key=976e3cf4b3b44a799e4b1a6cd1d4e01f`);
  }, [game_id, updateUrl]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="relative container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
        Welcome to the {data.name} page
      </h1>

      <div className="grid md:grid-cols-2 gap-6 bg-base-200 p-6 rounded-xl shadow-lg items-start">
        {/* Txt */}
        <div className="space-y-4 max-w-prose">
          <p className="text-sm text-gray-500">Uscita: {data.released}</p>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <ToggleFavorite data={data} />
          </div>
          <p className="text-md">⭐ Rating: {data.rating}</p>
          <div className="prose prose-invert max-w-none text-white">
            <h3>About:</h3>
            <p>{data.description_raw}</p>
          </div>
        </div>

        {/* Img */}
        <div className="flex justify-center">
          <img
            src={data.background_image}
            alt={data.name}
            className="rounded-lg max-h-[500px] object-cover shadow-xl"
          />
        </div>
      </div>

      {/* Chatbox */}
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbox data={data} />
      </div>
    </div>
  );
}
