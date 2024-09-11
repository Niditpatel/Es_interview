const router = require('express').Router();

const UserController = require('../Controllers/User.controller');

const AuthMiddleware = require('../MiddleWares/auth.middleware');

router.use(AuthMiddleware.checkForAuthentication);

router.get('/:id',UserController.getUserInfo);

module.exports = router;