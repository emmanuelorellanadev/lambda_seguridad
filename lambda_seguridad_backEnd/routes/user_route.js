const { Router } = require('express');
const { check } = require('express-validator');

const {userController} = require('../controllers');
const { checkFields, checkJWT, requiredRole } = require('../middlewares');
const { uploadImage } = require('../helpers/uploadImage');

const router = Router();

//GET USER
router.get('/', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER'),
    checkFields
], userController.getUsers);

router.get('/:id', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], userController.getUser);

//CREATE USER
router.post('/', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER'),
    uploadImage.any('img'), 
    check('user_name', 'The user name is required').not().isEmpty(),
    check('user_pass', 'The password is required').not().isEmpty(),
    check('user_state', 'The status is required').not().isEmpty(),
    check('RoleId', 'Check Role').not().isEmpty(),
    checkFields,
], userController.saveUser);
 
//UPDATE USER
router.put('/:id', [
    // checkJWT, 
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    uploadImage.any('img'),
    check('user_name', 'The user name is required').not().isEmpty(),
    check('user_pass', 'The password is required').not().isEmpty(),
    check('user_state', 'The status is required').not().isEmpty(),
    check('RoleId', 'Check Role').not().isEmpty(),
    checkFields
 
], userController.updateUser)

router.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
], userController.deleteUser)

module.exports = router; 