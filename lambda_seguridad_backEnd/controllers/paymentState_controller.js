const catchedAsync = require("../errors_handler/catchedAsync");
const { GeneralError, DBError } = require("../errors_handler/errors");
const PaymentState = require("../models/paymentState_model");
const { resSuccessful } = require("../response/resSucessful");

const getPaymentStates = async(req, res) => {
    const paymentStates = await PaymentState.findAll();

    if ( paymentStates.length == 0 ) throw new GeneralError('No se encontraron estados de pago.');

    resSuccessful(res, paymentStates);
};

const getPaymentState = async(req, res) => {
    const { id } = req.params;
    const paymentStates = await PaymentState.findByPk( id );

    if ( !paymentStates ) throw new GeneralError('No se encontró el estado de pago.');

    resSuccessful(res, paymentStates);
};

const savePaymentState = async(req, res) => {
    const paymentStatesToSave = req.body;
    
    await PaymentState.create( paymentStatesToSave )
        .catch(error => { throw new DBError(error, 'Error al guardar el estado')});

    resSuccessful(res, 'Estado guardado exitosamente.');
};

const updatePaymentState = async(req, res) => {
    const { id } = req.params;
    const paymentStatesToUpdate = req.body;
    
    const paymentStates = await PaymentState.findByPk( id )

    if ( !paymentStates ) throw new GeneralError('Error: no se encontró el estado.');

    await PaymentState.update( paymentStatesToUpdate, {where: {id: id}} )
        .catch(error => { throw new DBError(error, 'Error al actualizar el estado')});

    resSuccessful(res, 'Estado guardado exitosamente.');
};

const deletePaymentState = async(req, res) => {
    const { id } = req.params;
    
    const paymentStates = await PaymentState.findByPk( id )

    if ( !paymentStates ) throw new GeneralError('Error: no se encontró el estado a eliminar.');

    await PaymentState.destroy( {where: {id: id}} )
        .catch(error => { throw new DBError(error, 'Error al eliminar el estado')});

    resSuccessful(res, 'Estado eliminado exitosamente.');
};

module.exports = {
    getPaymentStates: catchedAsync(getPaymentStates),
    getPaymentState: catchedAsync(getPaymentState),
    savePaymentState: catchedAsync(savePaymentState),
    updatePaymentState: catchedAsync(updatePaymentState),
    deletePaymentState: catchedAsync(deletePaymentState)
}