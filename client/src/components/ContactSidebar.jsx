import { useProfileStore } from "../context/data/dataStore";

export default function ContactSidebar() {
  const { contacts } = useProfileStore((state) => state.defaultProfile);

  return (
    <div className="h-screen w-80 font-orbitron">
      <div className="w-60 h-3/4 overflow-y-scroll rounded-xl m-5 border border-cyan-400 p-2 flex flex-col items-center">
        Contacts
        {contacts.map((contact) => (
          <div
            className={`w-3/4 border border-cyan-400 p-2 m-1 rounded-lg text-left hover:bg-cyan-400 hover:bg-opacity-50 ${
              contact.Online ? 'text-green-500' : 'text-red-500'
            }`}
            key={contact.username}
          >
            {contact.username.toUpperCase()} 
            {/* ( {contact.Online ? '✅️' : '❌️'}) */}
          </div>
        ))}
      </div>
    </div>
  );
}
