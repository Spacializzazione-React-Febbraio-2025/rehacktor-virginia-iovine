import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";

export default function HomePage() {
    
const [data, setData] = useState(null);
const [error, setError] = useState(null);

const initialUrl = "https://api.rawg.io/api/games?key=976e3cf4b3b44a799e4b1a6cd1d4e01f&dates=2024-01-01,2024-12-31&page=1";

const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    load();
  }, []);
    

    return (
        <>
          <h1 className="text-2xl font-bold mb-4">Homepage</h1>
          <div className="grid grid-cols-4 gap-4">
            {error && <article className="col-span-full text-red-500">{error}</article>}
            {data &&
              data.results.map((game) => (
                <CardGame key={game.id} game={game} />
              ))}
          </div>
        </>
      );
}
