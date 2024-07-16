const { Router } = require('express');
const { check } = require('express-validator');
const { changePasswordController } = require('../controllers');
const { checkFields } = require('../middlewares');

const router = Router();

router.put('/:id', [
    check('user_pass', 'The new Password is required').not().isEmpty(),
    checkFields
], changePasswordController.putUserPass);

module.exports =router