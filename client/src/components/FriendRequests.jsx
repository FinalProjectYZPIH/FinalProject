import React, { useEffect, useState } from "react";
import axios from "axios";

const FriendRequests = (userId) => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `/api/friendRequests?recipientId=${userId}`
        );
        setFriendRequests(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Freundesanfragen:", error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

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
    <div>
      {friendRequests.length === 0 ? (
        <h2>No Friend Requests yet </h2>
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
