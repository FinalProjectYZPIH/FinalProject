import React, { useEffect, useState } from "react";
import axios from "../libs/axiosProtected";
import {
  useColorStore,
  useDarkLightMode,
  useProfileStore,
} from "../context/data/dataStore";
import { CopySlash } from "lucide-react";

const FriendRequests = () => {
  const { userIdDB } = useProfileStore((state) => state.defaultProfile);
  const { lightMode, setDarkMode } = useDarkLightMode();
  const [friendRequests, setFriendRequests] = useState([]);
  const { colorPosition, setColorPosition, setSpecificColor, color } =
    useColorStore();

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `/api/friendRequests?recipientId=${userIdDB}`
        );
        console.log("Friend requests:", response.data);

        const friendRequestsWithData = await Promise.all(
          response.data.map(async (request) => {
            const senderResponse = await axios.get(
              `/api/friendRequests/getSenderName?senderId=${request.sender_id}`
            );
            console.log("Sender response:", senderResponse);
            const senderName = senderResponse.data.name;
            console.log("Sender name:", senderName);
            return { ...request, senderName };
          })
        );

        setFriendRequests(friendRequestsWithData);
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
        <div
          className={`${
            lightMode ? " bg-neutral-900" : " bg-white"
          } fixed right-2 ${color} rounded-lg sm:w-32 md:w-52 text-center pt-2 my-6 h-1/6`}
        >
          No Friend Requests
        </div>
      ) : (
        <div>
          <ul>
            {friendRequests.map((request) => (
              <li key={request._id}>
                <p> {request.senderName}</p>
                <button
                  onClick={() => handleResponse(request._id, "accepted ✅️")}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(request._id, "rejected ❌️")}
                >
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
