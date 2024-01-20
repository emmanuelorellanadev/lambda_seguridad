const { validationResult } = require('express-validator');
const { deleteImage } = require('../helpers/uploadImage');
const { GeneralError } = require('../errors_handler/errors');

const checkFields = (req, res, next ) => {
    
    const errors = validationResult(req);
    
    if ( !errors.isEmpty() ){
        deleteImage(req.fileNameToSave)
        throw new GeneralError(JSON.stringify(errors), 400);
     }

     next();
}

module.exports = {
    checkFields
}