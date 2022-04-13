var jwt = require('jsonwebtoken');
require('dotenv').config(); // pour accéder au .env

const JWT_SIGN_SECRET = process.env.JWT_TOKEN;
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign( {
            //mettre ici ce qu'on veut recupérer du token
            userId: userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
          try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null)
              userId = jwtToken.userId;
          } catch(err) { }
        }
        return userId;
    }
}