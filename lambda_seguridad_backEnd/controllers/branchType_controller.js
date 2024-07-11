const catchedAsync = require('../errors_handler/catchedAsync');
const { DBError, GeneralError } = require('../errors_handler/errors');
const BranchType = require('../models/branchType_model');
const { resSuccessful } = require('../response/resSucessful');

const getBranchTypes = async(req, res) => {

    await BranchType.findAll()
        .then( branchTypes => {
            if(branchTypes.length == 0){
                throw new DBError(null, 'No se encontraron tipos de sucursal', 404)
            }
            resSuccessful(res, branchTypes)
        })
}

const getBranchType = async(req, res) => {
    const { id } = req.params;

    await BranchType.findByPk(id)
        .then( branchType => {
            if(!branchType){
                throw new DBError(null, `Error: Tipo de sucursal no encontrada`, 404)
            }
            resSuccessful(res, branchType)
        });
}

const saveBranchType = async(req, res) => {
    const body = req.body;

    await BranchType.create( body )
        .then( branchType => resSuccessful(res, `Tipo de sucursal ${branchType.branchType_name} creada exitosamente.`))
        .catch( error => { throw new DBError( error, 'Error al guardar el tipo de sucursal', 400 ) } )

}

const updateBranchType = async(req, res) => {
    const { id } = req.params;
    const branchType = req.body

    await BranchType.findByPk( id )
        .then( branchType => { if (!branchType)  { throw new DBError(null, 'Error: no se encontró el tipo de sucursal', 404) } })
    
    await BranchType.update( branchType, { where: { id: id} } )
        .then( () => resSuccessful( res, `Tipo de sucursal actualizado correctamente.`) )
        .catch( error => { throw new DBError( error, 'Error: No se pudo actualizar el tipo de sucursal.', 400 ) })
}

const deleteBranchType = async(req, res) => {
    const { id } = req.params;

    await BranchType.destroy({ where: {"id": id}})
        .then((resp) => {
            if(!resp) { throw new GeneralError('Tipo de sucursal no encontrado.', 404) }
            resSuccessful(res, `Tipo de sucursal eliminada correctamente.`)
        })
}

module.exports = {
    getBranchTypes: catchedAsync(getBranchTypes),
    getBranchType: catchedAsync(getBranchType),
    saveBranchType: catchedAsync(saveBranchType),
    updateBranchType: catchedAsync(updateBranchType),
    deleteBranchType: catchedAsync(deleteBranchType)
}