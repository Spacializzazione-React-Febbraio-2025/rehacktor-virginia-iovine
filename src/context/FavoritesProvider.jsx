import { useState, useCallback, useEffect, useContext } from "react";
import FavoritesContext from "./FavoritesContext";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";

export default function FavoritesProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  // Recupero dei preferiti, se utente loggato
  const getFavorites = useCallback(async () => {
    if (!session?.user?.id) return;
    const { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Errore nel recupero dei preferiti:", error.message);
    } else {
      setFavorites(favourites);
    }
  }, [session]);

  // Aggiunge gioco ai preferiti
  const addFavorite = async (game) => {
    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();

    if (error) {
      console.error("Errore nell'aggiunta:", error.message);
    } else {
      setFavorites((prev) => [...prev, ...data]);
    }
  };

  // Rimuove un gioco dai preferiti
  const removeFavorite = async (gameId) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", session?.user.id);

    if (error) {
      console.error("Errore nella rimozione:", error.message);
    } else {
      setFavorites((prev) => prev.filter((f) => f.game_id !== gameId));
    }
  };

  // fetch + realtime updates con Supabase
  useEffect(() => {
    if (!session) return;

    getFavorites();

    const favoritesChannel = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "favorites",
          filter: `user_id=eq.${session.user.id}`,
        },
        () => {
          getFavorites();
        }
      )
      .subscribe();

    return () => {
      favoritesChannel.unsubscribe();
    };
  }, [getFavorites, session]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, getFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

  