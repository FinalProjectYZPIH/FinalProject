import React, { useEffect, useState } from "react";
import axios from "../libs/axiosProtected";
import { useDarkLightMode } from "../context/data/dataStore";
import { useProfileStore } from "../context/data/dataStore";

const FriendRequests = () => {
  const {userIdDB} = useProfileStore((state) => state.defaultProfile);
  const { lightMode, setDarkMode } = useDarkLightMode();
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`/api/friendRequests?recipientId=${userIdDB}`);
        console.log("Friend requests:", response.data);
        setFriendRequests(response.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
  
    fetchFriendRequests();
  }, [userIdDB]);
  
  

  const handleResponse = (requestId, response) => {
    axios
      .put(`/api/friendRequests/${requestId}`, {
        requestId, // ID der Anfrage
        response, // 'accepted' oder 'rejected'
      })
      .then((response) => {
        console.log(`Friend request ${response}:`, response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Bearbeiten der Freundesanfrage:", error);
      });
  };

  return (
    <div className="text-cyan-400">
      {friendRequests.length === 0 ? (
        <div className={`${
          lightMode ? " bg-neutral-900" : " bg-white"
        } fixed right-2 border border-cyan-400 rounded-lg sm:w-32 md:w-52 text-center pt-2 my-6 h-1/6`}>
          No Friend Requests
        </div>
      ) : (
        <div>
          <ul>
            {friendRequests.map((request) => (
              <li key={request._id}>
                <p> {request.senderName}</p>
                <p> {request.status}</p>
                <button onClick={() => handleResponse(request._id, "accepted")}>
                  Accept
                </button>
                <button onClick={() => handleResponse(request._id, "rejected")}>
                  Reject
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
