const cors = require('cors');
const { validateLogin } = require("./validations/loginValidation");
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection was succesful;`);
});

//TODO make the refresh token, and Create MONGO DB Schema for this.
app.route('/token').post((request, response) => {

});

app.route("/login").post( async (request, response) => {
    const loginErrorMessage = 'The combination of user and password was not found.';
    const { error } = validateLogin(request.body);

    const requestUsername = request.body.username;
    const requestPassword = request.body.password;

    if (error)
        return response.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ username: requestUsername });
    if (!user)
        return response.status(400).json({ error: loginErrorMessage });

    const isPasswordValid = await bcrypt.compare(requestPassword, user.password);

    if (!isPasswordValid)
        return response.status(400).json({ error: loginErrorMessage });
    
    const jsonWebToken = generateAccessToken(user);
    const refreshToken = jwt.sign({_id: user._id}, process.env.JWT_REFRESH);
    
    response.header('auth-token', jsonWebToken).header('refresh-token', refreshToken)
            .json({ok: true, message: 'Logged In'});
});


function generateAccessToken (user) {
    return jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'});
}

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
