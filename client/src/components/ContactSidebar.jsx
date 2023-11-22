import { useDarkLightMode, useProfileStore } from "../context/data/dataStore";
import { useColorStore } from "../context/data/dataStore";

export default function ContactSidebar() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  const { color } =
    useColorStore();
  const { contacts } = useProfileStore((state) => state.defaultProfile);

  return (
    <div
      className={`h-screen w-72 font-orbitron ${lightMode ? "dark bg-none" : "light bg-none"
        }`}
    >
      <div className={`h-4/5 mt-5  mx-2 overflow-x-hidden rounded-xl shadow-lg  border border-cyan-400 p-1 flex flex-col items-center ${color}`}>
        Contacts
        {contacts.map((contact) => (
          <div
            className={`w-3/4 border border-cyan-400 p-2 mx-1 my-1 rounded-lg text-left hover:bg-cyan-400 hover:bg-opacity-50 ${contact.Online ? "text-green-500" : "text-red-500"} ${color} `}
            key={contact.username}
          >
            {contact?.username?.toUpperCase()}
            {/* ( {contact.Online ? '✅️' : '❌️'}) */}
          </div>
        ))}
      </div>
    </div>
  );
}
