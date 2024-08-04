const { saveUser, get } = require("../controllers/users_controller");
const bcrypt = require('bcrypt');

class usersHandler{
    constructor(){
    }

    async getUser(req, res){
        try{
            get(req.app.get("models")["User"], {email: req.params.email}).then((user) => {
                if(user){
                    delete user.dataValues.password;
                    res.status(200).json(user);
                }else{
                    res.status(400).send({status:'false', message:'User does not exist', errorCode: 400});
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }

    async saveUser(req, res){
        try{
            this.checkIfUserExists(req.app.get("models")["User"], req.body.email).then(async (user) => {
                if(!user){
                    let user = {...req.body};
                    user.createdAt = new Date();
                    user.updatedAt = new Date();
                    user.password = await bcrypt.hash(user.password, 10);
                    console.log(user);
                    const response = await saveUser(req.app.get("models")["User"], user);
                    delete response.dataValues.password;
                    res.status(200).json(response);
                }else{
                    res.status(400).send({status:'false', message:'User already exists', errorCode: 400});
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }

    async checkIfUserExists(model, email){
        if(email){
            return await get(model, {email});
        }
    }
}

module.exports = usersHandler;