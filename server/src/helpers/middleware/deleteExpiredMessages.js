import schedule from 'node-schedule';
import ChatRoomModel from '../../models/chatRoom.model.js';

const deleteExpiredMessages = () => {
  // Define a rule for running the task every day
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6]; // All days
  rule.hour = 0; // 0:00 (midnight)
  rule.minute = 0;

  // Schedule the task
  schedule.scheduleJob(rule, async () => {
    try {
      // Calculate the date and time one day ago
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      // Find and delete messages older than one day
      await ChatRoomModel.updateMany(
        { 'messages.timestamp': { $lt: oneDayAgo } },
        { $pull: { messages: { 'timestamp': { $lt: oneDayAgo } } } }
      );
    } catch (error) {
      console.error("Error deleting expired messages:", error);
    }
  });
};

export default deleteExpiredMessages;
