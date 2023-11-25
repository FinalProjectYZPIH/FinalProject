import express from "express";
const router = express.Router();
import {
  createFriendRequest,
  getFriendRequestsForUser,
  getSenderName,
  respondToFriendRequest,
} from "../controllers/friendRequest.js";

// GET: Get friendRequests for specific user using query
router.get("/", getFriendRequestsForUser);

// GET: Get sender name for specific friend request using query
router.get("/getSenderName", getSenderName);

// POST: Create a new friend request
router.post("/sendRequest", createFriendRequest);

// PUT: Respond to a friend request (Accept or Reject)
router.put("/:requestId", respondToFriendRequest);

export default router;
