import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from 'react-icons/fa';

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center w-full bg-black rounded-lg shadow-lg">
            <button
                type="submit"
                className="flex items-center justify-center px-5 py-5 bg-black text-white rounded-l-lg hover:bg-gray-800 hover:bg-opacity-60 focus:outline-none transition-colors"
            >
                <FaSearch className="text-lg text-lime-400 hover:text-white transition-colors" />
            </button>
            <input
                type="text"
                name="search"
                placeholder={ariaInvalid ? "cerca qualcosa" : "Cerca un gioco..."}
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
                className="w-full py-3 px-4 text-lg text-white bg-black rounded-r-lg focus:outline-none"
            />
        </form>
    );
}
