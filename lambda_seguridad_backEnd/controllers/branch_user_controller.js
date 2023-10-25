//GET THE BRANCH OF THE USER

const Branch_User = require('../models/branch_user_model');
const Branch = require('../models/branch_model');

const branchUserGet = async( req, res ) => {
    const { id } = req.params;

    try {
        const branchUserData = await Branch_User.findOne( {where: {UserId: id}} )

        const branchData = await Branch.findOne( {where: { id : branchUserData.BranchId }})

        res.json({
            branchData
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    branchUserGet
}