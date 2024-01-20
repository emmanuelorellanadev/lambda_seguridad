const { Router } = require('express');
const { check } = require('express-validator');

// const { login } = require('../controllers/login_controller');
const { checkFields } = require('../middlewares/check_fields');
const { loginController } = require('../controllers');

const router = Router();

router.post('/', [
    check('name', 'The user name is required').not().isEmpty(),
    check('pass', 'The password is required').not().isEmpty(),
    checkFields
], loginController.login);

module.exports = router;