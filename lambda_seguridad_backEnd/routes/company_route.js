const { Router } = require('express');
const { check } = require('express-validator');

const { requiredRole } = require('../middlewares/checkRole');
const { checkJWT } = require('../middlewares/check-jwt');
const { createCompany, 
        getCompanies, 
        getCompanyId, 
        updateCompany,
        deleteCompany    } = require('../controllers/company_controller');
const { checkFields } = require('../middlewares/check_fields');
const { uploadImage } = require('../helpers/uploadImage');

const route = Router();

route.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
],getCompanies);

route.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], getCompanyId)

route.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    // check('company_name', 'The company name is required').not().isEmpty(),
    // check('company_address', 'The company address is required').not().isEmpty(),
    // check('company_phone', 'The company phone is required').not().isEmpty(),
    // check('company_description', 'The company description is required').not().isEmpty(),
    checkFields,
], uploadImage.any('img'), createCompany);

route.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    // check('company_name', 'The company name is required').not().isEmpty(),
    // check('company_address', 'The company address is required').not().isEmpty(),
    // check('company_phone', 'The company phone is required').not().isEmpty(),
    // check('company_description', 'The company description is required').not().isEmpty(),
    // check('company_mission', 'The company mission is required').not().isEmpty(),
    // check('company_vision', 'The company vision is required').not().isEmpty(),
    checkFields,

], uploadImage.any('img'), updateCompany);

route.delete('/:id',[
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], deleteCompany);



module.exports = route;