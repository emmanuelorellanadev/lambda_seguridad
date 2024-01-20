const { Router } = require('express');
const { checkJWT, requiredRole } = require('../middlewares');
const { personTypeController } = require('../controllers');

const router = Router();

router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], personTypeController.getPersonTypes);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], personTypeController.getPersonType);

router.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], personTypeController.savePersonType);

router.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], personTypeController.updatePersonType);

router.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], personTypeController.deletePersonType);

module.exports = router;
