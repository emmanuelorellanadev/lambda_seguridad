//Branch Controller

const catchedAsync = require('../errors_handler/catchedAsync');
const { DBError, GeneralError } = require('../errors_handler/errors');
const Branch = require('../models/branch_model');
const BranchType = require("../models/branchType_model");
const Company = require("../models/company_model");
const { resSuccessful } = require('../response/resSucessful');

//GET BRANCHS
const getBranches = async( req, res ) => {
        const branches = await Branch.findAll();
        if(branches.length == 0) {throw new DBError(null, `Error: No se encontraron sucursales.`, 404)}
        resSuccessful(res, branches)
}   

//GET BRANCH
const getBranch = async( req, res ) => {
    const { id } = req.params;

    await Branch.findByPk(id, {include: [{ model: Company }, { model: BranchType }]})
        .then( branch => {
            if( !branch ) {throw new DBError(null, 'Error: No se encontró la sucursal', 404)}
            resSuccessful(res, branch);
        })
}

//SAVE BRANCH
const saveBranch = async(req, res) => {
    const branchToSave = req.body;

    const company = await Company.findByPk(branchToSave.CompanyId);
    const branchType = await BranchType.findByPk(branchToSave.BranchTypeId);

    if( !company || !branchType ){
        throw new GeneralError('Error: Empresa o tipo de sucursal no encontradas', 404)     
    }

    branchToSave.CompanyId = company.id;
    branchToSave.BranchTypeId = branchType.id;

    const branchSaved = await Branch.create(branchToSave)
        .then( branch => resSuccessful(res, `Sucursal ${branch.branch_name} creada exitosamente`))
        .catch(error => { throw new DBError(error, 'Error: No se pudo guardar la sucursal', 400) })
}

//UPDATE BRANCH
const updateBranch = async(req, res) => {
    const { id } = req.params;
    const branchToUpdate = req.body;
    
        const company = await Company.findByPk(branchToUpdate.CompanyId);
        const branchType = await BranchType.findByPk(branchToUpdate.BranchTypeId);
        const branch = await Branch.findByPk(id);

        if (!company || !branchType || !branch) {throw new DBError(null, `Empresa, sucursal o tipo de sucursal no encontradas`, 401)}

        await Branch.update( branchToUpdate, { where:{id: id} } )
            .then( () => { resSuccessful(res, `Sucursal ${branchToUpdate.branch_name} actualizada correctamente`)})
            .catch( error => {throw new DBError(error, `Error al actualizar la sucursal`, 400)})
}

//DELETE BRANCH
const deleteBranch = async(req, res) => {
    const { id } = req.params;

    const branchToDelete = await Branch.findByPk(id);
    if (!branchToDelete) { throw new DBError(null, 'Error: No se encontró la sucursal', 404) }

    await Branch.destroy({ where: {id : id} })
        .then( () => resSuccessful(res, 'Sucursal eliminada correctamente.'))
        .catch( error => { console.log(error); throw new DBError(error, 'No se pudo eliminar la sucursal', 400) } )
}   

module.exports = {
    getBranches: catchedAsync(getBranches),
    getBranch: catchedAsync(getBranch),
    saveBranch: catchedAsync(saveBranch),
    updateBranch: catchedAsync(updateBranch),
    deleteBranch: catchedAsync(deleteBranch)
}