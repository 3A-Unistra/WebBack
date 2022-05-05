const res = require('express/lib/response');
var jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
require('dotenv').config(); // pour accéder au .env

const JWT_SIGN_ACCESS = process.env.ACCESS_TOKEN;
const JWT_SIGN_REFRESH = process.env.REFRESH_TOKEN;

module.exports = {
    generateTokenForUser: function(userData) {
      return jwt.sign( {
        //mettre ici ce qu'on veut recupérer du token
        userId: userData.id
      },
      JWT_SIGN_ACCESS,
      {
        expiresIn: '30s'
      })    
    },
    generateRefreshTokenForUser: function(userData) {
        return jwt.sign( {
            //mettre ici ce qu'on veut recupérer du token
            userData
        },
        JWT_SIGN_REFRESH,
        {
            expiresIn: '1y'
        })
    },
    authenticateToken: function(authHeader) {
      const token = authHeader && authHeader.split(' ')[1]
    
      if (token == 'null') return res.sendStatus(402);;
    
      jwt.verify(token, process.env.ACCESS_TOKEN, (err,decoded) => {
        if (err) {
          return false;
          //return res.sendStatus(417).json(err);
        }
      });
      return true;
    }

    /*
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
    },

     authenticateToken: function(req, res, next) {
        const authHeader = req.headers['Authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
          if (err) {
            return res.sendStatus(401)
          }
          req.user = user;
          next();
        });
      }*/
      
}