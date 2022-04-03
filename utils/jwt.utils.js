var jwt = require('jsonwebtoken');
require('dotenv').config(); // pour accéder au .env

const JWT_SIGN_SECRET = process.env.JWT_TOKEN;
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign( {
            //mettre ici ce qu'on veut recupérer du token
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}