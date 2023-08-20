const Role = require('../models/role_model');

const getRole = async(req, res) => {
    try {

        const roles = await Role.findAll();

        if( !roles ){
            return res.status(401).json({
                msg: 'There are no roles on database'
            })
        }

// Check if the role of userLogued is less than the role to show.
// That doesnt allow a suerpuser to create a admin user
        roles.map( (role, i = 0) => {
            role.id < req.userLoggedIn.RoleId ? roles.splice(i, 1) : '';
            i++
        })

        return res.json({
            roles
        })

    } catch (error) {
        console.log('Cant fetch roles of the database'.bgRed);
        throw(error)
    }
}

const createRole = async(req, res) => {

    const body = req.body;

    try { 
        const roleWrited = await Role.create( body );
        
        res.json({    
            msg: 'post works',
            roleWrited
        })
    } catch (error) {
        console.log('ERROR WRITING DATA'.bgRed);
        res.status(400).json({
            error
        })
        throw(error);
    } 

}

const updateRole = async(req, res) => {

    const { id } = req.params;
    const usuarioEdit = req.body

    try {
        const roleUpdated = await Role.update( 
            usuarioEdit,
            { where: { id: id} }
            );
        console.log(id);
        res.json({    
            msg: 'post works',
            roleUpdated
        })
    } catch (error) {
        console.log('ERROR WRITING DATA'.bgRed);
        res.status(400).json({
            error
        })
        throw(error);
    } 
}

module.exports = {
    getRole,
    createRole,
    updateRole
}