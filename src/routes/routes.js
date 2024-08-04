const router = require('express').Router();
const todo = require('../handlers/todosHandler');
const user = require('../handlers/usersHandler');
const login = require('../handlers/loginHandler');
const verifyToken = require('../middlewares/authMiddleware');

const userHandler = new user();
const todoHandler = new todo();
const loginHandler = new login();

router.get('/', (req, res) => {
    res.send('Welcome to the Todos API');
});

// login user
router.post('/login', (req, res) => {
    loginHandler.login(req, res);
})

// logout user
router.post('/logout', verifyToken, (req, res) => {
    res.send('Logout user');
})

// create user
router.post('/register', (req, res) => {
    userHandler.saveUser(req, res);
})

// get user
router.get('/getUser/:email', verifyToken, (req, res) => {
    userHandler.getUser(req, res);
})

router.get('/getAllTodos/:userId', verifyToken, (req, res) => {
    todoHandler.getTodos(req, res);
})

router.post('/todo', verifyToken, (req, res) => {
    todoHandler.saveTodos(req, res);
})

router.put('/todo/:id', verifyToken, (req, res) => {
    todoHandler.updateTodos(req, res);
})

router.delete('/todo/:id', verifyToken, (req, res) => {
    todoHandler.deleteTodos(req, res);
})
module.exports = router