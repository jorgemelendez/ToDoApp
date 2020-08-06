let ToDo = require('../models/todo.model');
const todoRouter = require('express').Router();

// Gets all
todoRouter.route('/').get((_, response) => {
    ToDo.find()
        .then(todos => response.json(todos))
        .catch( error => response.status(400).json(`Error: ${error}`));
});

// TODO: Hash the todo's so we the user can have more privacy on what they store
// Create
todoRouter.route('/add').post((request, response) => {
    const userId = request.body.userId;
    const title = request.body.title;
    const description = request.body.description;
    const dateDue = Date.parse(request.body.dateDue);

    if (userId) {
        const newTodo = new ToDo({userId, title, description, dateDue});

        newTodo.save()
            .then(() => response.json('ToDo added succesfully.'))
            .catch(error => response.status(400).json(`Error: ${error}`));

    } else {
        response.status(400).json(`Error: Missing requiered parameters.`);
    }
 });

 // Get
 todoRouter.route('/:id').get((request, response) => {
    ToDo.findById(request.params.id)
        .then( todo => response.json(todo))
        .catch(error => response.status(400).json(`Error: ${error}`));
});

//Delete
todoRouter.route('/:id').delete((request, response) => {
    ToDo.findByIdAndDelete(request.params.id)
        .then(() => 'The ToDo has been deleted.')
        .catch(error => response.status(400).json(`Error: ${error}`));
});

// Updated
todoRouter.route('/update/:id').post((request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const dateDue = Date.parse(request.body.dateDue);

    ToDo.findById(request.body.id)
        .then(todo => {
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            todo.dateDue = dateDue || todo.dateDue;

            todo.save()
                .then(() => response.json(`ToDo updated succesfully`))
                .catch(error => response.status(400).json(`Error: ${error}`));
        })
        .catch(error => response.status(400).json(`Error: ${error}`));
});



module.exports = todoRouter;