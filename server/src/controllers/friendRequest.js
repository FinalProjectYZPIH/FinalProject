import FriendRequestModel from "../models/friendRequest.model.js";
import UserModel from "../models/user.model.js";
import { verifyJwt } from "../helpers/utils/jwt.utils.js";

export const getFriendRequestsForUser = async (req, res) => {
  try {
    const recipientId = req.query.recipientId; // Get the recipientId from the query parameters

    // Query the database to find friend requests for the specific recipient
    const friendRequests = await FriendRequestModel.find({ recipient_id: recipientId });

    res.json(friendRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
};

export const getSenderName =  async (req, res) => {
  try {
    const senderId = req.query.senderId;
    const sender = await UserModel.findById(senderId);

    if (sender) {
      res.json({ name: sender.username });
    } else {
      res.status(404).json({ error: 'Sender not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const createFriendRequest = async (req, res, next) => {
  try {
    const {recipientId } = req.body;
    const { accessJwt } = req.cookies;
   
  if (!accessJwt) {
    res.status(400);
    return next("Access token not found in cookies");
  }

  const { decoded, valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);

    // Check if the request already exists
    const existingRequest = await FriendRequestModel.findOne({
      sender_id: decoded.UserInfo.id,
      recipient_id: recipientId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent." });
    }

    const newRequest = new FriendRequestModel({
      sender_id: decoded.UserInfo.id,
      recipient_id: recipientId,
      status: "pending",
    });
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating friend request." });
  }
};

export const respondToFriendRequest = async (req, res) => {
  try {
    const {response ,requestId} = req.body;
   
    // Update the friend request status to "accepted" or "rejected"
    const updatedRequest = await FriendRequestModel.findByIdAndUpdate(
      requestId,
      { status: response },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    if (response === "accepted") {
      // Add the sender and recipient as friends
      await UserModel.findByIdAndUpdate(updatedRequest.sender_id, {
        $push: { friends: updatedRequest.recipient_id },
      });

      await UserModel.findByIdAndUpdate(updatedRequest.recipient_id, {
        $push: { friends: updatedRequest.sender_id },
      });

      await FriendRequestModel.findByIdAndRemove(requestId);
    }
    else if (response === "rejected") {
        await FriendRequestModel.findByIdAndRemove(requestId);
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error responding to friend request." });
  }
};

