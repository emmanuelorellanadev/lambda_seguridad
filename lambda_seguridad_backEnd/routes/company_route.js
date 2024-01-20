const { Router } = require('express');
const { check } = require('express-validator');

const { requiredRole } = require('../middlewares/checkRole');
const { checkJWT } = require('../middlewares/check-jwt');
const { companyController} = require('../controllers');
const { checkFields } = require('../middlewares/check_fields');
const { uploadImage } = require('../helpers/uploadImage');

const route = Router();

route.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
],companyController.getCompanies);

route.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], companyController.getCompany)

route.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    uploadImage.any('img'),
    check('company_name', 'The company name is required').not().isEmpty(),
    check('company_address', 'The company address is required').not().isEmpty(),
    check('company_phone', 'The company phone is required').not().isEmpty(),
    check('company_description', 'The company description is required').not().isEmpty(),
    checkFields,
], companyController.saveCompany);

route.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    uploadImage.any('img'),
    check('company_name', 'The company name is required').not().isEmpty(),
    check('company_address', 'The company address is required').not().isEmpty(),
    check('company_phone', 'The company phone is required').not().isEmpty(),
    check('company_description', 'The company description is required').not().isEmpty(),
    check('company_mission', 'The company mission is required').not().isEmpty(),
    check('company_vision', 'The company vision is required').not().isEmpty(),
    checkFields,
],  companyController.updateCompany);

route.delete('/:id',[
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], companyController.deleteCompany);


module.exports = route;