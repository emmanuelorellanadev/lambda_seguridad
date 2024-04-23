const catchedAsync = require("../errors_handler/catchedAsync");
const { GeneralError } = require("../errors_handler/errors");
const PaymentDetail = require("../models/paymentDetail_model");
const { resSuccessful } = require("../response/resSucessful");

const getPaymentDetail = async(req, res) =>{
    const paymentDetail = await PaymentDetail.findAll();

    if( paymentDetail.length == 0 ) throw new GeneralError('No se encontraron detalles de pago.');

    resSuccessful(res, paymentDetail);
}

module.exports = {
    getPaymentDetail: catchedAsync(getPaymentDetail)
}