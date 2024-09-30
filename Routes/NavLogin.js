const express = require('express');
const routes = express.Router();
const { GetUser } = require('../Auth/Authentication');
routes.get('/', async function(req, res) {
    try {
        console.log('req is coming');
        const token = req.headers['Authorization']?.split(' ')[1]; // Extract the token from 'Bearer token'
        if (!token) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        const checktoken = await GetUser(token);
        if (!checktoken) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        // User found and token is valid
        return res.status(200).json({
            message: "Authorized",
            role: checktoken.role,
            name: checktoken.name
        });
    } catch (error) {
        console.error('Error in /NavLogin:', error); // Log error for debugging
        return res.status(500).send(error);
    }
});

module.exports = routes;
