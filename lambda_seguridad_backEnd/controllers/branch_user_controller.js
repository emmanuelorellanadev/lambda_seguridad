//GET THE BRANCH OF THE USER

const Branch_User = require('../models/branch_user_model');
const Branch = require('../models/branch_model');
const catchAsync = require('../errors_handler/catchedAsync');
const { DBError, GeneralError } = require('../errors_handler/errors');
const { resSuccessful } = require('../response/resSucessful');

const branchUserGet = async( req, res ) => {
    const { id } = req.params;

        const branchUserData = await Branch_User.findOne( {where: {UserId: id}} )
            .catch(error => { throw new DBError(error, 'Error al buscar BranchUser', 404) })

        console.log(branchUserData.BranchId)
        // await Branch.findByPk( branchUserData.BranchId )
        const branchData = await Branch.findOne( {where: { id : branchUserData.BranchId }})
            .catch(error => { throw new DBError(error, 'Error al buscar la sucursal por usuario', 404)})

        if ( !branchData ) { throw new GeneralError('Error al buscar la sucursal por usuario')}

        resSuccessful(res, branchData)
}

module.exports = {
    branchUserController: catchAsync(branchUserGet)
}