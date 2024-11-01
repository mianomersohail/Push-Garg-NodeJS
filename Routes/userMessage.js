const express = require('express');
const routes = express.Router();
const { UserMessageSchemas } = require('../schema/usermessagemodel');

routes.get('/', async function(req, res) {
  try {
    const messages = await UserMessageSchemas.find({}).sort({ createdAt: 1 });
    
    if (messages && messages.length > 0) {

        return res.status(200).json({ messages: messages });
    }
    
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "An error occurred while fetching messages" });
  }
});

module.exports = routes;
