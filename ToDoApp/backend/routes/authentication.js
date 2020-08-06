const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const jwt = require('jsonwebtoken'); 
const { validateLogin } = require("../validations/loginValidation");

router.route('/register').post(async (request, response) => {
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

module.exports = router;
