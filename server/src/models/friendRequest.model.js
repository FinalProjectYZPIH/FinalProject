// friendRequest.model.js
import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  recipient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    required: true,
  },
});

const FriendRequestModel = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequestModel;
