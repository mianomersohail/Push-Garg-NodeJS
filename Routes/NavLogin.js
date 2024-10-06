const express = require('express');
const routes = express.Router();
const { GetUser } = require('../Auth/Authentication');
routes.get('/', async function(req, res) {
    try {
        console.log('Req is Coming')
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 
        if (!token) {
            return res.status(200).json({ message: 'No token provided' }); 
        }
        const checktoken = await GetUser(token);
        if (!checktoken) {
            console.log('Invalid or expired token');
            return res.status(200).json({ message: 'Invalid or expired token' }); 
            }
        console.log('Token is valid',checktoken);
        return res.status(200).json({ message: 'User authenticated', user: checktoken });
    } catch (error) {
        console.error('Error in /NavLogin:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = routes;
