const { saveTodo } = require("../controllers/todos_controller");

class todoHandler {
    constructor() {}

    async getTodos(req, res) {
        try{
            const todos = await req.app.get("models")["Todo"].findAll({
                where: {
                    userId: req.params.userId
                }
            });
            res.status(200).json(todos);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }

    async saveTodos(req, res) {
        try {
            let todo = {...req.body};
            todo.user_id = req.body['userId'];
            todo.createdAt = new Date();
            todo.updatedAt = new Date();
            todo.scheduleAt = new Date();
            const response = await saveTodo(req.app.get("models")["Todo"], todo);
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }

    async updateTodos(req, res) {
        try {
            let todo = {...req.body};
            todo.updatedAt = new Date();
            const response = await req.app.get("models")["Todo"].update(todo, {
                where: {
                    uid: req.params.id
                },
                returning: true,
                // plain: true
            });
            console.log(response[1][0].dataValues);
            res.status(200).json(response[1][0].dataValues);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }

    async deleteTodos(req, res) {
        try {
            const response = await req.app.get("models")["Todo"].destroy({
                where: {
                    uid: req.params.id
                }
            });
            res.status(204).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }
}

module.exports = todoHandler;