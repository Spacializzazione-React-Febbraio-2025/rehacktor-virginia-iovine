// Abbiamo aggiunto un CHECK per verificare che la risposta dalla API sia effettivamente quella che ci aspettiamo;
// aggiungendo poi un MESSAGGIO DI CARICAMENTO mentre i dati vengono recuperati.
// Abbiamo fatto in modo che genres iniziasse come null, e non come un array con null; per poter distinguere tra NON CARICATO 
// ed ERRORE DI CARICAMENTO. Attraverso il LOADING viene mostrato un messaggio di caricamento finché i dati non sono disponibili.
// Verifichiamo attraverso json.result che il popolamento della API avvenga correttamente per caricare i generi.
// Con FALLBACK E MESSAGGI DI ERRORE/VUOTO rendiamo visibile un messaggio di errore o una notifica se ci sono errori o nessun dato disponibile.


import { Link } from "react-router";
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresDropdown({ closeDrawer }) {
    const initialUrl = "https://api.rawg.io/api/genres?key=976e3cf4b3b44a799e4b1a6cd1d4e01f";

    const { data, loading, error } = useFetchSolution(initialUrl);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <details className="dropdown">
            <summary>Genres</summary>
            {error && <small className="text-red-500">{error}</small>}
            <ul className="p-2">
                {data?.results?.length > 0 ? (
                    data.results.map((genre) => (
                        <li key={genre.id}>
                            <Link to={`/games/${genre.slug}`} onClick={closeDrawer}>
                                {genre.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No genres available</li>
                )}
            </ul>
        </details>
    );
}
