import express from 'express';
const router = express.Router();
import { createFriendRequest, respondToFriendRequest } from '../controllers/friendRequest.js';

// POST: Create a new friend request
router.post('/', createFriendRequest);

// PUT: Respond to a friend request (Accept or Reject)
router.put('/:requestId', respondToFriendRequest);

export default router;
