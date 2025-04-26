import { useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
export default function GenrePage() {
    const { genre } = useParams();

    const initialUrl = `https://api.rawg.io/api/games?key=976e3cf4b3b44a799e4b1a6cd1d4e01f&dates=2024-01-01,2024-12-31&genres=${genre}&page=1`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    // Quando cambia il genere selezionato, aggiorniamo l'URL da fetchare
    useEffect(() => {
        updateUrl(`https://api.rawg.io/api/games?key=976e3cf4b3b44a799e4b1a6cd1d4e01f&dates=2024-01-01,2024-12-31&genres=${genre}&page=1`);
    }, [genre, updateUrl]);

    return (
        <>
            <h2>Welcome to {genre} page</h2>

            {loading && <p>Loading games...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {data && data.results && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.results.map((game) => (
                        <CardGame key={game.id} game={game} />
                    ))}
                </div>
            )}

            {data && data.results?.length === 0 && (
                <p>No games available for this genre.</p>
            )}
        </>
    );
}
