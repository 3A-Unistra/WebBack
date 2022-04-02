var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils.js');
var models = require('../models');
require('dotenv').config(); // pour accéder au .env

const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports = {
    register: function(req,res) {
        var email = req.body.email;
        var login = req.body.login;
        var password = req.body.password;
        var name = req.body.name;

        if (email == null || login == null || password == null || name == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({'error' : 'email invalid'});
        }
        //regex mdp nécessaire ?

        models.Users.findOne({
            attributes: ['email'], // change ce qui est cherché dans la requête
            where: {email: email}
        })
        .then(function(userFound) {
            if(!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    var newUser = models.Users.create({
                        email: email,
                        login: login,
                        name: name,
                        password: bcryptedPassword
                    })
                    .then(function(newUser) {
                        return res.status(201).json( {'username': newUser.id})
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error': 'cannot find user'});
                    })
                })

            }   else {
                return res.status(409).json({'error': 'user already exists'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'unable to verify user'});
        });

    },

    login: function(req,res) {
        var login = req.body.login;
        var password = req.body.password;

        if (login == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        //regex mdr
        models.Users.findOne({
            where: { login: login}
        })
        .then(function(userFound) {
            if(userFound) {
                bcrypt.compare(password,userFound.password, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userid': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({'error':'invalid password'});
                    }
                });
            }else {
                return res.status(404).json({'error': 'user not in database'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'});
        });
    }
}