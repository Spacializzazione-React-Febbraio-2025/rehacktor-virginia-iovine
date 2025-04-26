// import { useState, useEffect, useRef } from "react";
// import CardGame from "../../components/CardGame";

// const API_KEY = "976e3cf4b3b44a799e4b1a6cd1d4e01f";
// const PAGE_SIZE = 20;

// export default function HomePage() {
//   const [games, setGames] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const observer = useRef();
//   const lastGameRef = useRef();

//   useEffect(() => {
//     loadGames();
//   }, [page]);

//   const loadGames = async () => {
//     if (isLoading || !hasMore) return;
//     setIsLoading(true);

//     try {
//       const res = await fetch(
//         `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=${page}&page_size=${PAGE_SIZE}`
//       );
//       if (!res.ok) throw new Error("Errore nel caricamento dei giochi");
//       const json = await res.json();
//       setGames((prev) => [...prev, ...json.results]);
//       setHasMore(!!json.next);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Pagination con scroll infinito
//   useEffect(() => {
//     if (isLoading) return;
//     if (observer.current) observer.current.disconnect();

//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage((prev) => prev + 1);
//       }
//     });

//     if (lastGameRef.current) {
//       observer.current.observe(lastGameRef.current);
//     }
//   }, [isLoading, hasMore]);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Homepage</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {games.map((game, index) => {
//           const isLast = index === games.length - 1;
//           return (
//             <div key={game.id} ref={isLast ? lastGameRef : null}>
//               <CardGame game={game} />
//             </div>
//           );
//         })}
//       </div>

//       {isLoading && (
//         <div className="text-center mt-6 text-lime-400 font-semibold animate-pulse">
//           Caricamento giochi...
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";

const API_KEY = "976e3cf4b3b44a799e4b1a6cd1d4e01f";
const PAGE_SIZE = 20;

export default function HomePage() {
  const [games, setGames] = useState([]); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {
    data,
    loading: isLoading,
    error,
    updateUrl,
  } = useFetchSolution(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=1&page_size=${PAGE_SIZE}`);

  const observer = useRef();
  const lastGameRef = useRef();

  useEffect(() => {
    updateUrl(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=${page}&page_size=${PAGE_SIZE}`);
  }, [page, updateUrl]);

  useEffect(() => {
    if (data?.results) {
      setGames(prevGames => [...prevGames, ...data.results]);
      setHasMore(!!data.next);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastGameRef.current) {
      observer.current.observe(lastGameRef.current);
    }
  }, [isLoading, hasMore]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Homepage</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game, index) => {
          const isLast = index === games.length - 1;
          return (
            <div key={game.id} ref={isLast ? lastGameRef : null}>
              <CardGame game={game} />
            </div>
          );
        })}
      </div>

      {isLoading && (
        <div className="text-center mt-6 text-lime-400 font-semibold animate-pulse">
          Caricamento giochi...
        </div>
      )}
    </div>
  );
}
