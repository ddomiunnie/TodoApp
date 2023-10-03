const express = require('express');
const router = express.Router();
const todoController = require('../controllers/Cmain');

//GET
router.get('/todos', todoController.getTodos);

//POST
router.post('/todos', todoController.addTodo);

//PATCH
router.patch('/todos/:id', todoController.updateTodo);

//DELETE
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
