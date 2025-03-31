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
            setData(json);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setData(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        // console.log("Genere selezionato: ", genre);
        load();
    }, [genre]);


    return (
        <>
        <h2>Welcome to {genre} page</h2>
            {data && data.results && (
            <div className="grid grid-cols-4 gap-4">
                {data.results.map((game) => (<CardGame key={game.id} game={game} />
            ))}
        </div>
    )}

    {data && data.results.length === 0 && <p>No games available for this genre.</p>}
        </>
        );
}
