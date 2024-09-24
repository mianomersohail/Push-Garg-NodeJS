const { GetUser } = require('../Auth/Authentication');

async function Addremove(req, res, next) {
    console.log("Middleware: Token validation");

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Safely extract token

        if (!token) {
            console.log('No token provided');
            return res.status(400).json({ message: "Token not provided" });
        }

        const result = await GetUser(token);
        if (!result) {
            return res.status(400).json({ message: "Invalid token" });
        }

        return next();
    } catch (error) {
        console.error("Error in Addremove middleware:", error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = Addremove;