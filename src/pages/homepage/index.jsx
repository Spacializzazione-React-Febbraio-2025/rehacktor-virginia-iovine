import { useState, useEffect, useRef, useCallback } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";

const API_KEY = "976e3cf4b3b44a799e4b1a6cd1d4e01f";
const PAGE_SIZE = 20;

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const {
    data,
    loading: initialLoading,
    error,
  } = useFetchSolution(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=1&page_size=${PAGE_SIZE}`);

  useEffect(() => {
    if (data?.results) {
      setGames(data.results);
      setHasMore(!!data.next);
    }
  }, [data]);

  const observer = useRef();

  const lastGameRef = useCallback(node => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsFetching(true);
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (page === 1) return;

    const fetchMoreGames = async () => {
      try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=${page}&page_size=${PAGE_SIZE}`);
        const newData = await res.json();

        setGames(prev => [...prev, ...newData.results]);
        setHasMore(!!newData.next);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMoreGames();
  }, [page]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Homepage</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game, index) => {
          if (index === games.length - 1) {
            return (
              <div ref={lastGameRef} key={game.id}>
                <CardGame game={game} />
              </div>
            );
          } else {
            return (
              <div key={game.id}>
                <CardGame game={game} />
              </div>
            );
          }
        })}
      </div>

      {(initialLoading || isFetching) && (
        <div className="text-center mt-6 text-lime-400 font-semibold animate-pulse">
          Caricamento giochi...
        </div>
      )}
    </div>
  );
}
