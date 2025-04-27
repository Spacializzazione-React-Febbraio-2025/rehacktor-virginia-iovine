import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from 'react-router';

export default function CardGame({ game }) {
    
    const genres = game.genres.map((genre) => genre.name).join(',');
    
    const { background_image: image } = game;
    
    return (
        <article key={game.id}>
        <LazyLoadGameImage image={image} />
        <strong>{game.name}</strong>
        <small>{genres}</small>
        <p>{game.released}</p>
        <Link to={`/games/${game.slug}/${game.id}`} className="game-link">
        <button className="btn bg-lime-400 text-white hover:bg-lime-500 hover:scale-105 transition-transform duration-200 p-2 m-2">Visita il gioco</button>
        </Link>
        
        </article>
    );
}