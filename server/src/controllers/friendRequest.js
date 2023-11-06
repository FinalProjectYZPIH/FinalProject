import FriendRequestModel from "../models/friendRequest.model.js";
import UserModel from "../models/user.model.js";

export const createFriendRequest = async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;

    // Check if the request already exists
    const existingRequest = await FriendRequestModel.findOne({
      sender_id: senderId,
      recipient_id: recipientId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent." });
    }

    const newRequest = new FriendRequestModel({
      sender_id: senderId,
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
    const { requestId, response } = req.body;

    // Update the friend request status to "accepted" or "rejected"
    const updatedRequest = await FriendRequest.findByIdAndUpdate(
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

