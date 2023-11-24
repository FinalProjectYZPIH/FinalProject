import React, { useEffect, useState } from "react";
import { useProfileStore } from "../context/data/dataStore";
import axios from "../libs/axiosProtected";

import { useDarkLightMode, useColorStore } from "../context/data/dataStore";

export default function SearchFriends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { userIdDB } = useProfileStore((state) => state.defaultProfile);
  const { lightMode, setDarkMode } = useDarkLightMode();
  const { color } = useColorStore();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `/api/user/search`,
          {
            params: { query: searchQuery },
          }
        );
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
    <div >
   
        <form className="">
          <input
            className={`w-2/4 text-gray-900 rounded-full ${lightMode ? "dark bg-none" : "light bg-none"
          }   ${color}`}
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </form>

      <div className={` flex items-center  w-52 rounded-lg text-left `}>
        <ul className="">
          {searchResults.map((user) => (
            <li key={user._id} className={` hover:bg-cyan-400 hover:bg-opacity-50 mx-1 my-1 w-3/4 self-center rounded-lg py-3 my-1 text-sm w-3/4  ${color}`}  >
              {user.username} - {user.displayname}{" "}
              {!user.friends.includes(userIdDB) && (
                <button className="" onClick={() => handleSendFriendRequest(user._id)}>
                 🌟️
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
