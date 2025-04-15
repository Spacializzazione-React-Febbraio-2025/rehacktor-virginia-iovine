import { useContext, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";

export default function Chatbot({ data }) {
  const { session } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));

    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session?.user.id,
            profile_username: session?.user.user_metadata.username,
            game_id: data.id,
            content: message,
          },
        ])
        .select();

      if (error) {
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-lime-400 text-black px-4 py-2 rounded-full shadow-lg hover:bg-lime-300 transition-all font-semibold flex items-center gap-2"
        >
          💬 Chat tra player
        </button>
      )}

      {isOpen && (
        <div className="w-72 h-[400px] flex flex-col bg-black text-white border border-lime-500 rounded-xl shadow-xl text-sm">
          {/* Chatbox */}
          <div className="bg-lime-400 text-black font-bold py-2 px-4 rounded-t-xl flex justify-between items-center">
            <span>🎮 Gamers Chat</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          {/* contenuto chat */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            <RealtimeChat data={data && data} />
          </div>

          <form
            onSubmit={handleMessageSubmit}
            className="p-2 border-t border-lime-500 bg-black"
          >
            <fieldset className="flex gap-2">
              <input
                type="text"
                name="message"
                placeholder="Scrivi un messaggio..."
                className="flex-1 rounded-md px-2 py-1 bg-black text-white border border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
              />
              <button
                type="submit"
                className="bg-lime-400 text-black px-3 py-1 rounded hover:bg-lime-300"
              >
                Invia
              </button>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}
