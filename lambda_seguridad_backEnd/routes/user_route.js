const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete } = require('../controllers/user_controller');
const { checkFields, checkJWT, requiredRole } = require('../middlewares')
// const { checkFields } = require('../middlewares/check_fields');
// const { checkJWT } = require('../middlewares/check-jwt');
// const { requiredRole } = require('../middlewares/checkRole');

const router = Router();

//GET USER
router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMIN', 'ROLE_SUPERUSER'),
    checkFields
], userGet);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], userGet);

//CREATE USER
router.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMIN', 'ROLE_SUPERUSER'),
    check('user_name', 'The user name is required').not().isEmpty(),
    check('user_password', 'The password is required').not().isEmpty(),
    check('user_status', 'The status is required').not().isEmpty(),
    checkFields
], userPost);

//UPDATE USER
router.put('/:id', [
    checkJWT, 
    requiredRole('ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    check('user_name', 'The user name is required').not().isEmpty(),
    check('user_password', 'The password is required').not().isEmpty(),
    check('user_status', 'The status is required').not().isEmpty(),
    check('RoleId', 'Check Role').not().isEmpty(),
    checkFields
 
], userPut)

router.delete('/', [
    checkJWT,
    requiredRole('ROLE_ADMIN'),
], userDelete)

module.exports = router;