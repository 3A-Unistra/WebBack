var express = require('express');

var usersCtr = require('./routes/usersCtr');

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/register').post(usersCtr.register);
    apiRouter.route('/users/login').post(usersCtr.login);
    apiRouter.route('/users/get_ids').post(usersCtr.getIds);
    apiRouter.route('/users/is_follow').post(usersCtr.isFollow);

    return apiRouter;

})();