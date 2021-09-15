const mongojs = require('mongojs');
const db = mongojs('todos-db', ['todos']);


module.exports = {

    getTodos: (req, res, next) => {
        db.todos.find((err, todos) => {
            if (err) return next (err);
            res.json(todos);
        });
    },

    getTodo: (req, res, next) => {
        db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, todo) => {
            if (err) return next (err);
            res.json(todo);
        });
    },

    addTodo: (req, res, next) => {
        const todo = req.body;
        if (!todo.title || !(todo.completed + '')){
            res.status(400).json({
                error: 'Bad Data'
            });
        } else {
            db.todos.save(todo, (err, todo) => {
                if (err) return next (err);
                res.json(todo);
            });
        }
    },

    deleteTodo: (req, res, next) => {
        db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
            if (err) return next(err);
            res.json(result);
        })
    },

    updateTodo: (req, res, next) => {
        const todo = req.body;
        const updateTodo = {}
    
        if(todo.completed){
            updateTodo.completed = todo.completed;
        }
        if(todo.title){
            updateTodo.title = todo.title;
        }
        if(todo.description){
            updateTodo.description = todo.description;
        }
        if(!updateTodo){
            res.status(400).json({
                error: 'Bad Request'
            });
        } else {
            db.todos.update(
                { _id: mongojs.ObjectId(req.params.id)},
                { $set: updateTodo },
                { upsert: true },
                (err, todo) => {
                   if (err) return next(err);
                    res.json(todo);
            });
        }
    }

};