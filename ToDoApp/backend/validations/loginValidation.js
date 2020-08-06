const { loginSchema } = require('./schemas/loginSchema');

const validateLogin = requestBody => {
    return loginSchema.validate(requestBody);
}

module.exports.validateLogin = validateLogin;