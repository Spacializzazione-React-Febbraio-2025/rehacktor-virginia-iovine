import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import { Link } from "react-router";
import GenresDropdown from "./GenresDropdown";
import Searchbar from "./Searchbar";
import supabase from "../supabase/supabase-client";

export default function Sidebar() {
    const { session } = useContext(SessionContext);
    const [profile, setProfile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    
    const closeDrawer = () => {
        const drawer = document.getElementById("my-drawer");
        if (drawer) drawer.checked = false;
    };
    
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        } else {
            alert('Signed out 👋🏻');
            closeDrawer();
        }
    };
    
    useEffect(() => {
        if (!session) return;
        
        const fetchProfile = async () => {
            const { data, error } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', session.user.id)
            .single();
            
            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data);
                
                if (data?.avatar_url) {
                    try {
                        const { data: imageData, error: downloadError } = await supabase
                        .storage
                        .from('avatars')
                        .download(data.avatar_url);
                        
                        if (downloadError) {
                            throw downloadError;
                        }
                        
                        const url = URL.createObjectURL(imageData);
                        setAvatarUrl(url);
                    } catch (err) {
                        console.error('Error downloading avatar:', err.message);
                    }
                }
            }
        };
        
        fetchProfile();
    }, [session]);
    
    return (
        <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content">
        <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
        <button
        className="btn btn-square btn-ghost"
        onClick={() => {
            const drawer = document.getElementById("my-drawer");
            if (drawer) drawer.checked = !drawer.checked;
        }}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        </button>
        </div>
        <div className="flex-1">
        <Link to="/">
        <img 
        src="/controller2.png"
        alt="Controller-Logo"
        className="h-15 w-auto"
        />
        </Link>
        </div>
        </div>
        </div>
        
        <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" aria-label="close sidebar"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
        <a className="text-lg font-semibold">Generi</a>
        <GenresDropdown closeDrawer={closeDrawer} />
        </li>
        <li>
        <a className="text-lg font-semibold mt-6">Cerca un gioco</a>
        <Searchbar closeDrawer={closeDrawer} />
        </li>
        
        {!session ? (
            <>
            <li><Link to="/login" onClick={closeDrawer} className="secondary">Login</Link></li>
            <li><Link to="/register" onClick={closeDrawer} className="secondary">Register</Link></li>
            <p className="text-center mt-4">Please log in to access your account</p>
            </>
        ) : (
            <li>
            <details className="dropdown">
            <summary className="flex items-center space-x-2">
            {avatarUrl ? (
                <img
                src={avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center font-bold text-white">
                {session.user.user_metadata.first_name?.charAt(0).toUpperCase()}
                </div>
            )}
            <span>Ciao 👋🏻 {session?.user.user_metadata.first_name}</span>
            </summary>
            <ul dir="rtl">
            <li><Link to="/account" onClick={closeDrawer} className="secondary">Settings</Link></li>
            <li><Link to="/profile" onClick={closeDrawer} className="secondary">Preferiti</Link></li>
            <li><button onClick={signOut}>Logout</button></li>
            </ul>
            </details>
            </li>
        )}
        </ul>
        </div>
        </div>
    );
}
