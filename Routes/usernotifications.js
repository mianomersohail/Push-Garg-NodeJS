const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const NotificationModel = require('../schema/notificationmodel');

// Route to fetch unread notifications and mark them as read for a specific user
routes.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        // Decode the token to get userId
        const decoded = jwt.verify(token, 'ILOVEBITCOIN'); // Ensure secret key matches the one used during token creation
        const userId = decoded.id; // Assuming userId is stored in the token

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        console.log(`User ID from token: ${userId}`);
        console.log('Marking notifications as read...');
        const unreadNotifications = await NotificationModel.find({
            readBy: { $ne: userObjectId }  // Fetch notifications where userObjectId is not in the readBy array
        }).sort({ createdAt: -1 });
        // Update notifications to include the user ID in the readBy array
        const updateResult = await NotificationModel.updateMany(
            { readBy: { $ne: userObjectId } }, // Only update notifications not already read by this user
            { $addToSet: { readBy: userObjectId } } // Add userId to the readBy array
        );

        console.log(`Updated Notifications: ${updateResult.nModified} notifications marked as read`);

        // Fetch only notifications that the user has not read
        
        console.log(unreadNotifications)

        console.log(`Unread Notifications Count: ${unreadNotifications.length}`);
        
        res.json({ unreadNotifications });  // Return only unread notifications
    } catch (err) {
        console.error(err);
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

module.exports = routes;
