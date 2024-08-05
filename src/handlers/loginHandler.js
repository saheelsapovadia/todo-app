const { get } = require("../controllers/users_controller");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class loginController {
    constructor() {
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await get(req.app.get("models")["User"], { email });
        if(!user) {
            const response = {
                status: 401,
                message: "Authentication failed",
                errorCode: 401
            }
            return res.status(response.status).json(response);
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            const response = {
                status: 401,
                message: "Authentication failed",
                errorCode: 401
            }
            return res.status(response.status).json(response);
        }
        delete user.dataValues.password;
        const token = jwt.sign({userData:user.dataValues}, process.env.JWT_SIGNING_SECRET, {
            expiresIn: '1h',
        });

        const response = {
            status: 200,
            message: "Login successful",
            accessToken: token
        }
        res.status(200).json(response);
    }
}

module.exports = loginController;