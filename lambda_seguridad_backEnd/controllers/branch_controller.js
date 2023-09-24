//Branch Controller

const Branch = require('../models/branch_model');
const BranchType = require("../models/branchType_model");
const Company = require("../models/company_model");

//GET BRANCHS
const getBranchs = async( req, res ) => {
    try {
        const branches = await Branch.findAll();
        if(!branches){
            return (
                res.status(401).json({
                    msg: 'There are no branchs in database'
                })
            )
        }
        res.json({
            branches
        })
    } catch (error) {
        console.log(error)
        throw error;
    }
}

//GET BRANCH
const getBranch = async( req, res ) => {
    const { id } = req.params;
    try {
        const branch = await Branch.findByPk(id, {include: [{ model: Company }, { model: BranchType }]});
        if(!branch){
            return (
                res.status(401).json({
                    msg: 'There are no branch with that id'
                })
            )
        }
        res.json({
            branch
        })
    } catch (error) {
        console.log(error)
        throw error;
    }
}

//SAVE BRANCH
const saveBranch = async(req, res) => {
    const branchToSave = req.body;

    try {
    const company = await Company.findByPk(branchToSave.CompanyId);
    const branchType = await BranchType.findByPk(branchToSave.BranchTypeId);

    if( !company || !branchType ){
        return(
            res.status(401).json({
                error: "Company or branchType doesn't exist"
            })
        );     
    }

    branchToSave.CompanyId = company.id;
    branchToSave.BranchTypeId = branchType.id;

    const branchSaved = await Branch.create(branchToSave);
    res.json({
        branchSaved
    })
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

//UPDATE BRANCH
const updateBranch = async(req, res) => {
    const { id } = req.params;
    const branchToUpdate = req.body;
    
    try {
        const company = await Company.findByPk(branchToUpdate.CompanyId);
        const branchType = await BranchType.findByPk(branchToUpdate.BranchTypeId);
        const branch = await Branch.findByPk(branchToUpdate.id);

        console.log(company, branchType, branch)

        if (!company || !branchType || !branch){
            return(
                res.status(401).json({
                    error: 'Error on data, check Ids'
                })     
            );
        }

        const branchUpdated = await Branch.update(
            branchToUpdate,
            {
                 where:{id: id}
            });

        res.json({
            branchUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

//DELETE BRANCH
const deleteBranch = async(req, res) => {
    const { id } = req.params;

    const branchToDelete = await Branch.findByPk(id);
    if (!branchToDelete){
        return(
            res.status(401).json({
                error: "No se encontro branch"
            })
        )
    }

    const branchDeleted = await Branch.destroy({
        where: {id : id}
    })
        res.json({
            msg: branchDeleted
        })
}

module.exports = {
    getBranchs,
    getBranch,
    saveBranch,
    updateBranch,
    deleteBranch
}