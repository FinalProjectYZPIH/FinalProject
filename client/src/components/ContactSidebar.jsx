import { useDarkLightMode, useProfileStore } from "../context/data/dataStore";
import { Button } from "../components/ui/Buttons";
import { Search } from "lucide-react";
import { useState } from "react";
import SearchFriends from "./SearchFriends";
import { useColorStore } from "../context/data/dataStore";

export default function ContactSidebar() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  const [friendSearch, setFriendSearch] = useState(false);

  const { color } = useColorStore();
  const { contacts } = useProfileStore((state) => state.defaultProfile);

  return (
    <div
      className={`h-screen w-72 font-orbitron ${lightMode ? "dark bg-none" : "light bg-none"
        }`}
    >
      <div className={`h-4/5 mt-5 mx-2 overflow-x-hidden rounded-xl shadow-lg border border-cyan-400 p-1 flex flex-col ${color}`}>
        <div className="flex justify-between w-52 p-3">
          Contacts
          <button onClick={() => {setFriendSearch(!friendSearch)}}>
            <Search color="#22d3ee" />
          </button>
        </div>
        {friendSearch ? (
          <SearchFriends />
        ) : (
          contacts.map((contact) => (
            <div
              className={`self-center w-3/4 ${color} p-2 mx-1 my-1 rounded-lg text-left hover:bg-cyan-400 hover:bg-opacity-50 ${
                contact.Online ? "text-green-500" : "text-red-500"
              }`}
              key={contact.username}
            >
              {contact.username.toUpperCase()}
              {/* ( {contact.Online ? '✅️' : '❌️'}) */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

