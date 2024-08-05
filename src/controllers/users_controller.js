
const saveUser = async (model, user) => {
    try {
        // check if email already exists
        const userExists = await model.findOne({
            where: {
                email: user.email
            }
        });
        console.log("exists",userExists);
        if (userExists) {
            return {message: "User already exists"};
        }
        const response = await model.create(user);
        return response;
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

const get = async (model, values) => {
    console.log("values",values);
    return model.findOne({where: values});
}

module.exports = {saveUser, get}