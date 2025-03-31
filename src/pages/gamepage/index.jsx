import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function GamePage() {
    const { game_id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialUrl = `https://api.rawg.io/api/games/{game_id}?key=976e3cf4b3b44a799e4b1a6cd1d4e01f`;

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
        load();
    }, [game_id]);
    
    // Se sta caricando, mostra un messaggio di loading
 if (loading) {
    return <p>Loading...</p>;
}


// Se c'è un errore, lo mostriamo
if (error) {
    return <p>Error: {error}</p>;
}


return (
    <>
            <h1>Welcome to the {data.name} page</h1>
            <div className="style-gamepage">
                <div className="style-game-info">
                    <p>{data && data.released}</p>
                    <h2>{data && data.name}</h2>
                    <p>Rating: {data && data.rating}</p>
                    <p>About:</p>
                    <p>{data && data.description_raw}</p>
                </div>
                <div className="style-game-image">
                    <img src={data && data.background_image} alt={data.name} />
                </div>
            </div>
        </>
    );
}