const router = require('express').Router();
let ToDo = require('../models/todo.model');

// Gets a list of all the ToDo's
router.route('/').get((_, response) => {
    ToDo.find()
        .then(todos => response.json(todos))
        .catch( error => response.status(400).json(`Error: ${error}`));
});

router.route('/add').post((request, response) => {
    
})