import crypto from 'crypto';
import ChatModel from '../models/ChatModel.js';

// hash the messages 
// this will be used in createMessage controller
const hashMessage = (messageContent) => {
  const hash = crypto.createHash('sha256');
  hash.update(messageContent);
  return hash.digest('hex');
};


// Create a new chat room
export const createChatRoom = async (req, res) => {
  try {
    const { name, creator } = req.body;
    const chatRoom = new ChatModel({ name, creator });
    await chatRoom.save();

    res.status(201).json(chatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating chat room.' });
  }
};

// Send a message in a chat room
export const sendMessage = async (req, res) => {
  try {
    const { chatRoomId, sender, content } = req.body;
    const chatRoom = await ChatModel.findById(chatRoomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found.' });
    }

    const hashedContent = hashMessage(content);

    const message = {
      sender,
      content,
      timestamp: new Date(),
      hashedContent,
    };

    chatRoom.messages.push(message);
    await chatRoom.save();

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending a message.' });
  }
};

// Get messages from a chat room
export const getChatRoomMessages = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const chatRoom = await ChatModel.findById(chatRoomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found.' });
    }

    const messages = chatRoom.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving chat room messages.' });
  }
};


