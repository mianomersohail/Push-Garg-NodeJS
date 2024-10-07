const { GetUser } = require('../Auth/Authentication');
async function AdminMiddleware(req, res, next) {
    try {
        console.log('Request received');

        // Extract the 'authorization' header
        const authHeader = req.headers['authorization'];

        // Extract the token from the authorization header (if exists)
        const token = authHeader && authHeader.split(' ')[1];

        console.log('Token:', token);

        // If no token is found, return an error response and stop the request
        if (!token) {
            return res.status(200).json({ message: 'You are logged out. No token provided.' });
        }

        // Verify the token (GetUser is expected to return user data or null/undefined if invalid)
        const user =await GetUser(token);

        if (!user) {
            return res.status(200).json({ message: 'You are logged out. No token provided.' });
        }

        // Token is valid, allow the request to proceed
        next();
    } catch (error) {
        console.error('Error in AdminMiddleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = AdminMiddleware;
