const jwt = require('jsonwebtoken');
const { get } = require('../controllers/users_controller');
async function verifyToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SIGNING_SECRET);
        req.userId = decoded.userData.uid;
        let user = await get(req.app.get("models")["User"], { uid: req.userId });
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;