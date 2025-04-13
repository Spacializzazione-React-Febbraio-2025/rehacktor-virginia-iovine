import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client";

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data?.session || null);
        };
        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    );
}
