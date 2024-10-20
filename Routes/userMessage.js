const express = require('express');
const routes = express.Router();
const { UserMessageSchemas } = require('../schema/usermessagemodel');

routes.get('/', async function(req, res) {
  try {
    // Fetch all messages, sorted by createdAt in ascending order
    const messages = await UserMessageSchemas.find({}).sort({ createdAt: 1 });
    
    // Check if any messages were found
    if (messages && messages.length > 0) {
      console.log(messages)
      return res.status(200).json({ messages: messages });
    }
    // No messages found
    return res.status(404).json({ message: "No messages found" });
    
  } catch (error) {
    // Log error to the console and return a server error response
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "An error occurred while fetching messages" });
  }
});

module.exports = routes;
