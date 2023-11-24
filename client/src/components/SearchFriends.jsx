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
     <div className={` flex items-center justify-center flex-col  w-52 rounded-lg text-left mx-1 `}>
        <form className=" ">
          <input
            className={`ml-7 w-2/4 text-gray-900 rounded-full ${lightMode ? "dark bg-none" : "light bg-none"
          }   ${color}`}
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </form>

    
        <ul className="">
          {searchResults.map((user) => (
            <li key={user._id} className={` hover:bg-cyan-400 hover:bg-opacity-50 mx-1 self-center rounded-lg py-3 my-1 text-sm w-3/4  ${color}`}  >
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
