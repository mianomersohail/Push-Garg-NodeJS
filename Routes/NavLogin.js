const express = require('express');
const routes = express.Router();
const { GetUser } = require('../Auth/Authentication');
routes.post('/', async function(req, res) {
    
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 
        if (!token) {
            return res.status(200).json({ message: 'No token provided' }); 
        }
        const checktoken = await GetUser(token);
        if (!checktoken) {
            return res.status(200).json({ message: 'Invalid or expired token' }); 
            }
        return res.status(200).json({ message: 'User authenticated', user: checktoken });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = routes;
