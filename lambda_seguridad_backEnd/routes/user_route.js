const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, userGet, userGetByBranch, userPost, userPut, userDelete } = require('../controllers/user_controller');
const { checkFields, checkJWT, requiredRole } = require('../middlewares');
const { uploadImage } = require('../helpers/uploadImage');
const checkUserFields = require('../middlewares/check_user_fields');
// const { checkFields } = require('../middlewares/check_fields');
// const { checkJWT } = require('../middlewares/check-jwt');
// const { requiredRole } = require('../middlewares/checkRole');

const router = Router();

//GET USER
router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER'),
    checkFields
], usersGet);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], userGet);

//CREATE USER
router.post('/', [
    checkUserFields,
    checkJWT,
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER'),
    checkFields,
], uploadImage.any('img'), userPost);
 
//UPDATE USER
router.put('/:id', [
    checkJWT, 
    checkUserFields,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    // check('user_name', 'The user name is required').not().isEmpty(),
    // check('user_pass', 'The password is required').not().isEmpty(),
    // check('user_status', 'The status is required').not().isEmpty(),
    // check('RoleId', 'Check Role').not().isEmpty(),
    checkFields
 
], uploadImage.any('img'), userPut)

router.delete('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
], userDelete)

module.exports = router; 