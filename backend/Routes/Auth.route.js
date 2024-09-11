const router = require('express').Router();

const AuthController = require('../Controllers/Auth.controller');


router.post('/signup',AuthController.registerUser);
router.post('/login',AuthController.login);

module.exports = router;