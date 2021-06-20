const express = require('express');
const Todo = require('./../models/Todo');

const router = express.Router();


router.get('/tool', (req, res) => {

    Todo.find({}, (err, todos) => {

        res.render("todos", {
            tasks: todos
        });
    });
});

// POST - Submit Task
router.post('/tool', (req, res) => {
    const newTask = new Todo({
        task: req.body.task
    });

    newTask.save()
    .then(task => res.redirect('/tool'))
    .catch(err => console.log(err));
});

// POST - Destroy todo item
router.post('/tool/todo/destroy', (req, res) => {
    const taskKey = req.body._key;

    Todo.findOneAndRemove({_id: taskKey}, (err) => {

        if(err) console.log(err);
        res.redirect('/tool');
    });
});


module.exports = router;