var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils.js');
var models = require('../models');
const mail = require('../H/mail.js');
const Sequelize = require ('sequelize');
const Op = Sequelize.Op; 
require('dotenv').config(); // pour accéder au .env

const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    register: function(req,res) {
        var email = req.body.email;
        var login = req.body.login;
        var password = req.body.password;
        var name = req.body.name;
        console.log(process.env.NODE_ENV)
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
                        password: bcryptedPassword,
                        piece: 1,
                        avatar: ""
                    })
                    .then(function(newUser) {
                        return res.status(201).json( {'username': newUser.id})
                    })
                    .catch(function(err) {
                        console.log(err)
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
        var username = req.body.username;
        var password = req.body.password;

        if (username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        //regex mdr
        models.Users.findOne({
            where: { name: username}
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
    },    

    getIds: function(req,res) {
        var ownUsername = req.body.ownName;
        var otherUsername = req.body.otherName;
        var ownId,otherId;

        if (ownUsername == null || otherUsername == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.Users.findOne({
            where: { name: ownUsername}
        })
        .then(function(userFound) {
            if(userFound) {
                ownId = userFound.id

                models.Users.findOne({
                    where: { name: otherUsername}
                })
                .then(function(otherUserFound) {
                        otherId = otherUserFound.id
                        return res.status(201).json( {
                            'ownId': ownId,
                            'otherId': otherId
                        })
                })
                .catch(function(err) {
                    return res.status(423).json({ 'error': otherUsername+' not found'});
                })
            }else {
                return res.status(417).json({'error': 'user not in database'});
            }
        })
        .catch(function(err){
            return res.status(507).json({ 'error': 'unable to verify user'});
        });
    },

    getOwnId: function(req,res) {
        var ownUsername = req.body.name;
        var ownId;

        if (ownUsername == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.Users.findOne({
            where: { name: ownUsername}
        })
        .then(function(userFound) {
            if(userFound) {
                ownId = userFound.id
                return res.status(201).json( {'ownId': ownId}) // renvoie son propre id
            } else {
                return res.status(400).json({'error': 'user not in database'});
            }
        })
        .catch(function(err){
            return res.status(507).json({ 'error': 'unable to verify user'});
        });
    },

    isFollow: function(req,res) {
        var ownId = req.body.ownId;
        var otherId = req.body.otherId;

        if (ownId == null || otherId == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User_friends.findOne({
            where: { 
                user_id: ownId,
                friend_id: otherId
            }
        })
        .then(function(relationFound) {
            return res.status(201).json( {'id': relationFound.id})
        })
        .catch(function(err) {
            return res.status(413).json({ 'error': 'relation not found'});
        })
    },

    Follow: function(req,res) {
        var ownId = req.body.ownId;
        var otherId = req.body.otherId;

        if (ownId == null || otherId == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User_friends.findOne({
            where: { 
                user_id: ownId,
                friend_id: otherId
            }
        })
        .then(function(relationFound) {
            if(!relationFound) {
                var newFollow = models.User_friends.create({
                    friend_id: otherId,
                    user_id: ownId,
                })
                return res.status(201).json( {'username': newFollow.id})
            } else {
                return res.status(550).json({'error': ' already a relation'});
            }
        })
        .catch(function(err) {
            return res.status(413).json({ 'error': 'relation not found'});
        })
    },
    
    Unfollow: function(req,res) {
        var ownId = req.body.ownId;
        var otherId = req.body.otherId;

        if (ownId == null || otherId == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User_friends.findOne({
            where: { 
                user_id: ownId,
                friend_id: otherId
            }
        })
        .then(function() {
            models.User_friends.destroy({
                where: { 
                    user_id: ownId,
                    friend_id: otherId
                }
            })
            return res.status(202).json( {'friendship': "gone"})
        })
        .catch(function(err) {
            return res.status(555).json({'error': 'cannot find relation'});
        })
    },
    getUserProfile: function(req, res) {
        var username = req.body.username;

        if(username == null){
            return res.status(401).json({'error': 'missing parameters'});
        }
        models.Users.findOne({
        where: { name: username }
        })
        .then (function(profileInfo){
            usernameToShow = profileInfo.name
            return res.status(201).json({
                'username': profileInfo.name,
                'login' : profileInfo.login,
                'pawn' : profileInfo.piece
            }) 
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'cannot fetch user' });
        });
    },
    
    changeNamePawn: function(req,res) {
        var newLogin = req.body.login;
        var newPawn = req.body.pawn;
        var username = req.body.username;

        if (username == null) {
            return res.status(400).json({'error': 'not in database'});
        }

        if (newLogin == null || newPawn == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }


        //regex mdr
        models.Users.findOne({
            where: { name: username},
        })
        .then(function(userFound) {
            if(userFound) {
                userFound.update({
                    login: newLogin,
                    piece: newPawn
                })}
                else {
                return res.status(401).json({'error': 'user not in database'});
            }
        })
        
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'});
        });
    },
    forgot: async(req,res, next)=>{    
        const users = await models.Users.findOne(
            {email: req.body.email})
        if (!users){
            return res.status(404).json({ 'error': 'No account with this mail exits'});
            
        }
        let token = await models.User_password_reset_tokens.findOne(
            {user_id: users.id});
        if (token){
            await token.destroy();
        }
        var expireDate = new Date ();
        expireDate.setDate (expireDate.getMinutes () + 1);
        token = await models.User_password_reset_tokens.create({
            date: Date.now() +600000, //valide pendant 10 minute
            user_id: users.id
         })
        //3.send them an email with token 
        var fullUrl = req.protocol + '://' + req.get('host');
        const resetURL = `${process.env.RESET_URL}/reset/${token.id}`;
        await mail.send({
            users:users,
            subject: 'Password Reset',
            resetURL:resetURL,
            html:`<h1>Lien de modification de mot de passe </h1> <p>vous avez demanee de modifier votre mot de passe merci de clique sur lien </p> <a href= "${resetURL}" >cliquer sur le lien </a>`,
            text:resetURL 
        });
        return res.status(200).json({ 'success': 'you have been emailed a password reset link'});
            //4 redirect page de login 
    },
    reset: async(req,res)=>{
        var verif= req.body.token;
        models.User_password_reset_token.findOne({
            where :{
            id:verifd
        }
        })
        .then(function(relatifound)
        {
            models.Uses.findOne({
                where:{
                    id : relationfound.usd 
                    }
            })
             .then(function(relationfoundd){
                    if(relationfoundd){
                        bcrypt.hash(mot, 5, function(err, bcryptedPassword) {
                            relationfoundd.update({
                                password:bdPassword
                            })
                            .then(function() {
                                return res.status(201).json( 'success')
                            })
                            .catch(function(err) {
                                console.log(err)
                                return res.status(500).json({'error': 'cannot find modified'});
                            })
                        })
                    }
                    else {
                     return res.status(200).json({ 'success': 'probleme de changement'});
                    }
                })
        })

        .catch(function(err){
            return res.status(507).json({ 'error': 'link invalide or expired'});
    })
        
    },
    confirmedPasswords : async(req,res,next) => {
        if (req.body.password === req.body['confirmpassword']){
            next();
            return;
        }
        res.status(401).json({ 'error': 'verifie le mot de pass'});
    },
    Update : async(req,res) =>{
       var mot = req.body.password;
       let expiry = Date.now() +0 ;
        models.User_password_reset_tokens.findOne({where:{
            id:req.body.token,
            date: {[Op.gt]: expiry}
            }})
            .then(function(relationfound){
                models.Users.findOne({where:{id : relationfound.user_id  }
                })
                 .then(function(relationfoundd){
                        if(relationfoundd){
                            bcrypt.hash(mot, 5, function(err, bcryptedPassword) {
                                relationfoundd.update({
                                    password:bcryptedPassword
                                })
                                .then(function() {
                                    return res.status(201).json( 'success')
                                })
                                .catch(function(err) {
                                    console.log(err)
                                    return res.status(500).json({'error': 'cannot find modified'});
                                })
                            })
                        }
                        else {
                         return res.status(200).json({ 'success': 'probleme de changement'});
                        }
                    })
            })

            .catch(function(err){
                return res.status(507).json({ 'error': 'link invalide or expired'});
        })
    },
    Supcompt : async(req,res,next) => {
        models.Users.findOne({
            where:{
                id: req.body.id
            }
            .deleteOne({_id:req.params.id})
            .then(function(rfound){
                res.status(200).json({ 'success': ' compte supprimer'});
            })
            .catch(function(err){
                res.status(401).json({ 'error': 'probleme de suppression'});
            })
    
    })
    }
}   
