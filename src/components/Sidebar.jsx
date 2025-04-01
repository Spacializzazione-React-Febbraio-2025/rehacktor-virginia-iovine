import GenresDropdown from "./GenresDropdown";
import Searchbar from "./Searchbar";

export default function Sidebar() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="flex-none">
                        <button
                            className="btn btn-square btn-ghost"
                            onClick={() =>
                                (document.getElementById("my-drawer").checked =
                                    !document.getElementById("my-drawer").checked)
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl text-lime-400">daisyUI</a>
                    </div>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li>
                        <a className="text-lg font-semibold">Generi</a>
                        <GenresDropdown />
                    </li>

                    <li>
                        <a className="text-lg font-semibold mt-6">Cerca un gioco</a>
                        <Searchbar />
                    </li>


                </ul>
            </div>
        </div>
    );
}
