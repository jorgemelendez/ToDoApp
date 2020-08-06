const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const verifyUser = require('./security');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection was succesful;`);
});

const todosRoute = require('./routes/todos.js');
const usersRoute = require('./routes/users');
const authenticationRoute = require('./routes/authentication');

app.use('/todos', verifyUser, todosRoute);
app.use('/users', verifyUser, usersRoute);
app.use('/auth', authenticationRoute);


app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});