var express = require('express');

var usersCtr = require('./routes/usersCtr');

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/register').post(usersCtr.register);
    apiRouter.route('/users/login').post(usersCtr.login);
    apiRouter.route('/users/getProfile').post(usersCtr.getUserProfile);
    apiRouter.route('/users/editProfile').post(usersCtr.changeNamePawn);
    return apiRouter;

})();