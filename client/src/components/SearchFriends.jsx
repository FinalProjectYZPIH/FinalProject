import React, { useEffect, useState } from "react";
import { useProfileStore } from "../context/data/dataStore";
import axios from "../libs/axiosProtected";
import { useColorStore } from "../context/data/dataStore";
import { SmilePlus } from "lucide-react";

export default function SearchFriends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { userIdDB } = useProfileStore((state) => state.defaultProfile);
  const { color } = useColorStore();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`/api/user/search`, {
          params: { query: searchQuery },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error during search:", error);
      }
    };

    handleSearch();
  }, [searchQuery]);

  const handleSendFriendRequest = async (recipientId) => {
    try {
      await axios.post("/api/friendRequests/sendRequest", {
        senderId: userIdDB,
        recipientId,
      });
      // Handle the response as needed
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div
      className={`overflow-x-hidden rounded-xl shadow-lg flex items-center flex-col ${color}`}
    >
      <form>
        <input
          className="w-44 h-8 pl-4 my-1 pr-8 text-gray-900 rounded-full border border-cyan-400 outline-cyan-400"
          id="search"
          type="search"
          placeholder="Search..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>

      <ul>
        {searchResults.map((user) => (
          <li
            className={`flex items-center flex-col w-44 h-16 ${color} my-1 rounded-lg text-left hover:bg-cyan-400`}
            key={user._id}
          >
            {user.username} {user.displayname}{" "}
            {!user.friends.includes(userIdDB) && (
              <button onClick={() => handleSendFriendRequest(user._id)}>
                <SmilePlus size={28} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
