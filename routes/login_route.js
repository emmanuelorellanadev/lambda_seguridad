const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/login_controller');
const { checkJWT } = require('../middlewares/check-jwt');
const { checkFields } = require('../middlewares/check_fields');

const router = Router();

router.post('/', [
    // checkJWT,
    check('name', 'The user name is required').not().isEmpty(),
    check('pass', 'The password is required').not().isEmpty(),
    checkFields
], login);

module.exports = router;