const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const NotificationModel = require('../schema/notificationmodel');

routes.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        const decoded = jwt.verify(token, 'ILOVEBITCOIN'); 
        const userId = decoded.id; 
        const userObjectId = new mongoose.Types.ObjectId(userId);

        console.log(`User ID from token: ${userId}`);
        console.log('Marking notifications as read...');
        const unreadNotifications = await NotificationModel.find({
            readBy: { $ne: userObjectId }  
        }).sort({ createdAt: -1 });
        const updateResult = await NotificationModel.updateMany(
            { readBy: { $ne: userObjectId } },
            { $addToSet: { readBy: userObjectId } } 
        );

        console.log(`Updated Notifications: ${updateResult.nModified} notifications marked as read`);

        
        console.log(unreadNotifications)

        console.log(`Unread Notifications Count: ${unreadNotifications.length}`);
        
        res.json({ unreadNotifications });  
    } catch (err) {
        console.error(err);
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

module.exports = routes;
