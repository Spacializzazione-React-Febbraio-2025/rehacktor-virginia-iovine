import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";

export default function AccountPage() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstname] = useState(null);
    const [last_name, setLastname] = useState(null);

    useEffect(() => {
        if (!session) return;

        let ignore = false;

        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, first_name, last_name`)
                .eq("id", user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setFirstname(data.first_name);
                    setLastname(data.last_name);
                }
                setLoading(false);
            }
        };

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session]);

    const updateProfile = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            alert("Profilo aggiornato con successo!");
        }

        setLoading(false);
    };

    if (!session) {
        return <div className="text-white text-center mt-10">Loading session...</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
            <form onSubmit={updateProfile} className="form-widget">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300">Email:</label>
                    <input
                        id="email"
                        type="text"
                        value={session.user.email}
                        disabled
                        className="mt-1 p-2 w-full border border-gray-700 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-gray-300">First Name</label>
                    <input
                        id="first_name"
                        type="text"
                        value={first_name || ""}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-gray-300">Last Name</label>
                    <input
                        id="last_name"
                        type="text"
                        value={last_name || ""}
                        onChange={(e) => setLastname(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-lime-400 text-white py-2 rounded-md hover:bg-lime-500 transition duration-300"
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
}
