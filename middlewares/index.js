

const checkFields = require('../middlewares/check_fields');
const checkJWT = require('../middlewares/check-jwt');
const checkRole = require('../middlewares/checkRole');

module.exports = {
    ...checkFields,
    ...checkJWT,
    ...checkRole
}