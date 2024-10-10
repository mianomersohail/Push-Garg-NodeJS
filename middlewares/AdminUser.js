const { GetUser } = require('../Auth/Authentication');
async function AdminMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(200).json({ message: 'You are logged out. No token provided.' });
        }
        const user =await GetUser(token);
        if (!user) {
            return res.status(200).json({ message: 'You are logged out. No token provided.' });
        }
        next();
    } catch (error) {
        console.error('Error in AdminMiddleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = AdminMiddleware;
