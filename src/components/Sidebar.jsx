import supabase from "../supabase/supabase-client";
import { useEffect, useState } from "react";
import GenresDropdown from "./GenresDropdown";
import Searchbar from "./Searchbar";
import { Link } from "react-router";

export default function Sidebar() {
    const [session, setSession] = useState(null);

    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            setSession(null);
        } else {
            setSession(data.session);
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        } else {
            alert('Signed out 👋🏻');
            getSession();
        }
    };


    useEffect(() => {
        getSession();
    }, []);

    // aggiorna la sessione quando un utente si autentica o si disconnette
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            // Dopo ogni cambiamento di stato dell'autenticazione, aggiorniamo la sessione
            setSession(session);
        });

        // Pulizia del listener
        return () => {
            authListener?.unsubscribe();
        };
    }, []);

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

                    <li>
                        <Link to="/login" className="secondary">Login</Link>
                    </li>

                    <li>
                        <Link to="/register" className="secondary">Register</Link>
                    </li>

                    {session ? (
                        <ul>
                            <li>
                                <details className="dropdown">
                                    <summary>Account</summary>
                                    <ul dir="rtl">
                                        <li><a href="#">Settings</a></li>
                                        <li><button onClick={signOut}>Logout</button></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    ) : (

                        // messaggio se l'utente non è loggato
                        <p className="text-center mt-4">Please log in to access your account</p>

                        
                    )}
                </ul>
            </div>
        </div>
    );
}
