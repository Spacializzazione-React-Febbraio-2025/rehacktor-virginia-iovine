import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import CardGame from '../../components/CardGame';

export default function SearchPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=976e3cf4b3b44a799e4b1a6cd1d4e01f&search=${game}`;

    const load = async () => {
        setLoading(true);
        setError(null);
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [game]);

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Risultati per: {game}</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-4 gap-4">
                {data && data.results && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
}
