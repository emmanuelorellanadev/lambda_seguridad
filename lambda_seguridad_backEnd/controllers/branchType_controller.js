const BranchType = require('../models/branchType_model');

const getBranchTypes = async(req, res) => {
    try {
        const branchTypes = await BranchType.findAll();

        if( !branchTypes ){
            return res.status(401).json({
                msg: 'There are no branch types on database'
            })
        }
        console.log('all users')
        return res.json({
            branchTypes
        })

    } catch (error) {
        console.log('Cant fetch branch types of the database'.bgRed);
        throw(error)
    }
}

const getBranchType = async(req, res) => {
    const { id } = req.params;

    try {

        const branchType = await BranchType.findByPk(id);

        if( !branchType ){
            return res.status(401).json({
                msg: 'There are no branch type on database'
            })
        }
        res.json({
            branchType
        })
    } catch (error) {
        console.log('Cant fetch branch type of the database'.bgRed);
        console.log(error)
        res.json({
            error
        })
    }
}

const createBranchType = async(req, res) => {
    const body = req.body;

    try { 
        const branchTypeWrited = await BranchType.create( body );
        res.json({    
            branchTypeWrited
        })
    } catch (error) {
        console.log('Error writing branch type'.bgRed);
        res.status(400).json({
            error
        })
        throw(error);
    } 
}

const updateBranchType = async(req, res) => {
    const { id } = req.params;
    const branchType = req.body

    try {
        const branchTypeToUpdate = await BranchType.findByPk( id );

        if( !branchTypeToUpdate ) {
            
            return res.status(401).json({ error: "BranchType not founded"});
            
        }

        const branchTypeUpdated = await BranchType.update( 
            branchType,
            { where: { id: id} }
            );
        res.json({    
            branchTypeUpdated
        })
    } catch (error) {
        console.log('Error update branch type'.bgRed);
        res.status(400).json({
            error
        })
        throw(error);
    } 
}

module.exports = {
    getBranchTypes,
    getBranchType,
    createBranchType,
    updateBranchType
}