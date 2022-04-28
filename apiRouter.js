var express = require('express');

var usersCtr = require('./routes/usersCtr');

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/register').post(usersCtr.register);
    apiRouter.route('/users/login').post(usersCtr.login);
    apiRouter.route('/users/get_ids').post(usersCtr.getIds);
    apiRouter.route('/users/getownid').post(usersCtr.getOwnId);
    apiRouter.route('/users/is_follow').post(usersCtr.isFollow);
    apiRouter.route('/users/follow').post(usersCtr.Follow);
    apiRouter.route('/users/unfollow').post(usersCtr.Unfollow);
    apiRouter.route('/users/getProfile').post(usersCtr.getUserProfile);
    apiRouter.route('/users/editProfile').post(usersCtr.changeNamePawn);
    apiRouter.route('/users/forget').post(usersCtr.forgot);
    //apiRouter.route('/users/reset/:token').get(usersCtr.reset);
    apiRouter.route('/users/reset/:token').post(usersCtr.confirmedPasswords, usersCtr.Update);
    return apiRouter;

})();