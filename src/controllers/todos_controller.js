
const saveTodo = async (model, todo) => {
    try {
        const response = await model.create(todo);
        return response;
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

module.exports = {saveTodo}