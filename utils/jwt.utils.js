var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0ODY1MTQ5OSwiaWF0IjoxNjQ4NjUxNDk5fQ.SX6GH0OoKi6w_jJLmG-NCOIvyCx5HVWxHDPjAG95PKo'
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