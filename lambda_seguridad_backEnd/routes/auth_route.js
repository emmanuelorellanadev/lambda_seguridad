const { Router } = require('express');
const { check } = require('express-validator');

const { checkFields } = require('../middlewares/check_fields');
const { authController } = require('../controllers');

const router = Router();

router.post('/', [
    check('name', 'The user name is required').not().isEmpty(),
    check('pass', 'The password is required').not().isEmpty(),
    checkFields
], authController.auth);

module.exports = router;