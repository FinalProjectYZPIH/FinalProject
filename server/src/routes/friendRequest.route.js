import express from 'express';
const router = express.Router();
import { createFriendRequest, getFriendRequestsForUser, respondToFriendRequest } from '../controllers/friendRequest.js';

// GET: Get friendRequests for specific user using query 
router.get("/",getFriendRequestsForUser);

// POST: Create a new friend request
router.post('/sendRequest', createFriendRequest);

// PUT: Respond to a friend request (Accept or Reject)
router.put('/:requestId', respondToFriendRequest);

export default router;
