import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";

export default function GenrePage() {
    const { genre } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialUrl = `https://api.rawg.io/api/games?key=976e3cf4b3b44a799e4b1a6cd1d4e01f&dates=2024-01-01,2024-12-31&genres=${genre}&page=1`;

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json.results);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setGenres(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [genre]);


    return (
        <>
        <h2>Welcome to {genre} page</h2>
        {loading && <p>Loading games...</p>}
            {error && <article>{error}</article>}
            <div className="grid-games-list">
            {data && data.results ? (
                data.results.map((game) => <CardGame key={game.id} game={game} />)
            ) : (
                <p>No games available for this genre.</p>
            )}
        </div>
        </>
    );
}
