const jwt = require('jsonwebtoken');

module.exports = function (request, response, next) {
    const authorizationToken = request.headers['auth-header'];
    if (!authorizationToken)
        return response.status(400).json({message:'Acces denied'});
    
    try{
        const verified = jwt.verify(authorizationToken, process.env.JWT_SECRET);
        request.user = verified;
        next();
    } catch (error) {
        response.status(400).json({error:error})
    }
}