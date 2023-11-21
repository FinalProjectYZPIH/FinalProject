import React, { useEffect, useState } from "react";
import { useProfileStore } from "../context/data/dataStore";
import axios from "axios";

export default function SearchFriends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { userIdDB } = useProfileStore((state) => state.defaultProfile);

  useEffect(() => {
    const handleSearch = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/api/user/search`, {
          params: {query:searchQuery}
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
      const response = await axios.post("/api/friendRequests/sendRequest", {
        senderId: userIdDB,
        recipientId,
      });
      // Handle the response as needed
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div>
      <div className="w-52">
        <form>
          <input
            className="w-52 h-8 pl-4 mt-0.5 pr-8 text-gray-900 rounded-full border border-cyan-400 outline-cyan-400"
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </form>
      </div>
      <div>
          <ul>
            {searchResults.map((user) => (
              <li key={user._id}>
                {user.username} - {user.displayname}{" "}
                <button onClick={() => handleSendFriendRequest(user._id)}>
                  Add Friend
                </button>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}
