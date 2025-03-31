// Abbiamo aggiunto un CHECK per verificare che la risposta dalla API sia effettivamente quella che ci aspettiamo;
// aggiungendo poi un MESSAGGIO DI CARICAMENTO mentre i dati vengono recuperati.
// Abbiamo fatto in modo che genres iniziasse come null, e non come un array con null; per poter distinguere tra NON CARICATO 
// ed ERRORE DI CARICAMENTO. Attraverso il LOADING viene mostrato un messaggio di caricamento finché i dati non sono disponibili.
// Verifichiamo attraverso json.result che il popolamento della API avvenga correttamente per caricare i generi.
// Con FALLBACK E MESSAGGI DI ERRORE/VUOTO rendiamo visibile un messaggio di errore o una notifica se ci sono errori o nessun dato disponibile.


import { useState, useEffect } from "react";
import { Link } from 'react-router';

export default function GenresDropdown() {
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialUrl = "https://api.rawg.io/api/genres?key=976e3cf4b3b44a799e4b1a6cd1d4e01f";

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
    }, []);

    // Se sta caricando, mostra un messaggio di loading
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <details className="dropdown">
            <summary>Genres</summary>
            {error && <small className="text-red-500">{error}</small>} {/* errore, se c'è */}
            <ul className="p-2">
                {genres?.length > 0 ? (
                    genres.map((genre) => (
                        <li key={genre.id}>
                            {/* Link per genere */}
                            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                        </li>
                    ))
                ) : (
                    <li>No genres available</li> // Fallback se non ci sono generi
                )}
            </ul>
        </details>
    );
    
}
