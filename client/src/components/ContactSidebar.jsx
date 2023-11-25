import { useDarkLightMode, useProfileStore } from "../context/data/dataStore";
import { Button } from "../components/ui/Buttons";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import SearchFriends from "./SearchFriends";
import { useColorStore } from "../context/data/dataStore";
import { useSocketProvider } from "../context/data/SocketProvider";
import axios from "../libs/axiosProtected"

export default function ContactSidebar() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  const [friendSearch, setFriendSearch] = useState(false);

  const { color } = useColorStore();
  const { contact } = useSocketProvider();
  const [friends, setFriends] = useState([]);
  console.log(friends);
  console.log(contact);

  useEffect(() => {
    console.log(1);
    const fetchData = async () => {
      try {
        console.log(2)
        const userData = await Promise.all(
          contact?.map(async (id) => {
            console.log(3)
            const response = await axios.get(`/api/user/getUser?userId=${id}`);
            console.log("User response:", response.data);

            // Check the structure of your response and adjust accordingly
            const userName = response.data.name;
            const userStatus = response.data.online;
            console.log("User name:", userName, "User status:", userStatus);

            return { userName, userStatus };
          })
        );
        setFriends(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [contact]);

  return (
    <div
      className={`h-screen w-72 font-orbitron ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <div className="h-4/5 mt-5 mx-2 overflow-x-hidden rounded-xl shadow-lg border border-cyan-400 p-1 flex flex-col">
        <div className="flex justify-between w-52 p-3">
          Contacts
          <button
            onClick={() => {
              setFriendSearch(!friendSearch);
            }}
          >
            <Search color="#22d3ee" />
          </button>
        </div>
        {friendSearch ? (
          <SearchFriends />
        ) : (
          friends?.map((friend) => (
            <div
              className={`self-center w-3/4 border border-cyan-400 p-2 mx-1 my-1 rounded-lg text-left hover:bg-cyan-400 hover:bg-opacity-50 ${
                friend.Online ? "text-green-500" : "text-red-500"
              }`}
              key={friend.userName}
            >
              {friend.userName}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
