const { Router } = require('express');
const { resSuccessful } = require('../response/resSucessful');
const { GeneralError } = require('../errors_handler/errors');

const router = Router();

router.all('/', (req, res, next) => {
    throw new GeneralError("Algo a salido mal. 404", 404); 
});

module.exports = router;
