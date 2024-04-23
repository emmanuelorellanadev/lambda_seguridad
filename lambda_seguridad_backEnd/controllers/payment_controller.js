const db_connection = require('../database/conf_database')
const catchedAsync = require("../errors_handler/catchedAsync");
const { GeneralError, DBError } = require("../errors_handler/errors");
const PaymentDetail = require("../models/paymentDetail_model");
const PaymentStatus = require("../models/paymentState_model");
const Payment = require("../models/payment_model");
const Reservation = require('../models/reservation_model');
const { resSuccessful } = require("../response/resSucessful");

const getPayments = async(req, res) => {
    const payments = await Payment.findAll();

    if ( payments.length == 0) throw new GeneralError('Pagos no encontrados');

    resSuccessful(res, payments)
}

const getPayment = async(req, res) => {
    const { id } = req.params;

    const payment = await Payment.findByPk(id, {include: [{ model: PaymentDetail}, {model: PaymentStatus }]});

    if ( !payment ) throw new GeneralError('Pago no encontrado');

    resSuccessful(res, payment)
}

const savePayment = async(req, res) => {
    const paymentAndDetailToSave = req.body;

    if ( !paymentAndDetailToSave.paymentDetail ) throw new GeneralError('Error. Detalle no encontrado.', 400);
    
    const { paymentDetail, ...paymentToSave } = paymentAndDetailToSave;

    //transaction
    await db_connection.transaction( async (transaction) => {
            
        const paymentSaved = await Payment.create(paymentToSave, {transaction}) 
            .catch( error => { throw new DBError(error, 'Error al guardar el pago') })
        
        paymentDetail.PaymentId = paymentSaved.id;
        await PaymentDetail.create(paymentDetail, {transaction})
            .catch(error => { throw new DBError(error, 'Error al guardar el detalle.') });
        const ReservationId = paymentToSave.ReservationId;
        
    })
    //update reservation state.
    await Reservation.update({ReservationStateId: 3}, {where: {id : paymentToSave.ReservationId}})

    resSuccessful(res, 'Pago realizado correctamente');

};

const updatePayment = async(req, res) => {
    const { id } = req.params;
    const paymentToSave = req.body;

    const paymentToUpdate = await Payment.findByPk( id );

    if ( !paymentToUpdate ) throw new GeneralError('Error: no se encontró el pago a actualizar.');

    await Payment.update(paymentToSave, {where: {id: id}})
        .catch(error => { throw new DBError(error, 'Error al actualizar el pago.')});

    resSuccessful(res, 'Pago actualizado correctamente')
};

const deletePayment = async(req, res) => {
    const { id } = req.params;

    const paymentToDelete = await Payment.findByPk( id );

    if ( !paymentToDelete ) throw new GeneralError('Error. Pago no encontrado');

    await Payment.destroy( {where: { id: id }} )
        .catch(error => { throw new DBError(error, 'Error al eliminar el pago.')});

    resSuccessful(res, 'Pago eliminado correctamente.')
}
module.exports = {
    getPayments: catchedAsync(getPayments),
    getPayment: catchedAsync(getPayment),
    savePayment: catchedAsync(savePayment),
    updatePayment: catchedAsync(updatePayment),
    deletePayment: catchedAsync(deletePayment),
}