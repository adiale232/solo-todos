const router = require('express').Router();
const { getTodos, getTodo, addTodo, deleteTodo, updateTodo } = require('../controllers/todos');

router.get('/', getTodos);
router.post('/', addTodo);
router.get('/:id', getTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

module.exports = router;