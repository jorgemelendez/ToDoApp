const usersRouter = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { validateLogin } = require("../validations/loginValidation");


//Get all
usersRouter.route("/").get( (_, response) => {
  User.find()
    .then((users) => response.json(users))
    .catch((error) => response.status(400).json(error));
});

// Create
usersRouter.route("/add").post(async (request, response) => {
  const { error } = validateLogin(request.body);

  if (error) return response.status(400).json({ error: error.details[0].message });

  const username = request.body.username;
  const password = request.body.password;

  const emailExists = await User.findOne({ username: username });

  if (emailExists)
    return response.status(400).json({ error: `This email has been already registered.`});

  const passwordSalt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, passwordSalt)
  
  const newUser = new User({ username, password: hashedPassword });

  newUser.save()
    .then(() => response.json({message: "User Saved.", userId: newUser._id }))
    .catch((error) => response.status(400).json(`Error: ${error}`));
});

//Read
usersRouter.route("/:id").get( (request, response) => {
  User.findById(request.params.id)
    .then((todo) => response.json(todo))
    .catch((error) => response.status(400).json(`Error: ${error}`));
});

//Delete
usersRouter.route("/:id").delete( (request, response) => {
  User.findByIdAndDelete(request.params.id)
    .then(() => response.json("Succesfully deleted the user"))
    .catch((error) => response.status(400).json(`Error: ${error}`));
});

//Update
usersRouter.route("/update/:id").post( (request, response) => {
  User.findById(request.params.id)
    .then((todo) => {
      todo.username = request.body.username || todo.username;
      todo.password = request.body.password || todo.password;

      todo
        .save()
        .then(() => response.json("Updated correctly"))
        .catch((error) => response.status(400).json(`Error: ${error}`));
    })
    .catch((error) => response.status(400).json(`Error: ${error}`));
});

module.exports = usersRouter;
