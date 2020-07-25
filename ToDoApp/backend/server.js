/* Configuration of Express + CORS + DotEnv */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
// @ts-ignore
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection was succesful;`);
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});