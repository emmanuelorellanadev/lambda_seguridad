const { Op } = require('sequelize')

const Role = require("../models/role_model");
const User = require("../models/user_model");
const Branch_User = require('../models/branch_user_model');
const Branch = require('../models/branch_model');
const { encryptPass } = require("../helpers/encrypt");
const catchedAsync = require("../errors_handler/catchedAsync");
const { resSuccessful } = require("../response/resSucessful");
const { GeneralError, DBError } = require("../errors_handler/errors");
const { deleteImage } = require("../helpers/uploadImage");
// const { paginate } = require("../helpers/paginate");

const getUsers = async(req, res) => {
    //used to paginate 
    const {q, page, limit, order_by, order_direction} = req.query;
    const search = {};
    let order = [];
    //pagination
    const limitNumber = parseInt(limit, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;


    const { count, rows } = await User.findAndCountAll({
        where: { [Op.or]: [
            {user_name: { [Op.like]: `%${q || ''}%`}},
        ]}, 
        attributes: ['id', 'user_name', 'user_state'], 
        limit: limitNumber, 
        offset: getOffset(pageNumber, limitNumber),
        include: 
            [
            {model: Role, attributes: ['role_name']}, 
            {model: Branch, attributes: ["branch_name"] }
            ],
        })
        
        resSuccessful(res, {
            prevPage: getPrevPage(pageNumber),
            currentPage: pageNumber,
            nextPage: getNextPage(pageNumber, limitNumber, count),
            total: count,
            limit: limit,
            data: rows
        })

    // const users = await User.findAll({include: [{include: Role}]});
    // if (users.length == 0) throw new GeneralError('Usuarios no encontrados')


    // //Delete the users than role is less than the user logued
    // users.map( (user, i = 0) => {
    //     console.log(i)
    //     user.RoleId > req.userLoggedIn.RoleId ? users.splice(i, 1) : '';
    //     i++
    // })
    
    // resSuccessful(res, users);
}

const getUser = async(req, res) => {
    const { id }  = req.params;
    
        const user = await User.findByPk(id, 
            {include: [
                {model: Role},
                {model: Branch, attributes: ['id', 'branch_name']}]});
        if ( !user ) {throw new GeneralError('Usuario no encontrado', 404)} 

        //if userLoggued tries to get a higher privileged user
        // if(user.RoleId > req.userLoggedIn.RoleId){
        //     throw new GeneralError('No tienens permisos suficientes para realizar esta operación', 401)                
        // }
        resSuccessful(res, user);
}

const saveUser = async(req, res) => {
    // const userToSave  = Object.assign({}, req.body); // fix [Object: null prototype]{xxx: xxxx}
    const userToSave  = req.body; 
    userToSave.user_img = req.fileNameToSave;

    if ( !userToSave ) { throw new GeneralError('Error, los datos no han sido enviados', 400) }

    //Encript password before save
    userToSave.user_pass = encryptPass( userToSave.user_pass );   

    //Add image name
    userToSave.user_img = req.fileNameToSave;

    //check if Role exist
    const role = await Role.findByPk( userToSave.RoleId ); 
    if( !( role && role.role_state ) ){ throw new GeneralError('Error, revisa el Role', 400) }

    //Search Branch
    const branch = await Branch.findByPk(userToSave.BranchId);
    if ( !branch ){ throw new GeneralError('Error, Sucursal no encontrada', 400) }

    //Save User
    await User.create( userToSave )
        .then( async ( userSaved ) => {
            await Branch_User.create({
                BranchId: userToSave.BranchId,
                UserId: userSaved.id })
        })
        .catch(error => {
            deleteImage(userToSave.user_img); 
            throw new DBError(error, 'Error al guardar el usuario', 400);
        })

    resSuccessful(res, `Usuario ${userToSave.user_name} guardado exitosamente.`)
}

const updateUser = async(req, res) => {
    // const userData  = Object.assign({}, req.body); // fix [Object: null prototype]{xxx: xxxx}
    
    const { id } = req.params;
    const userData = req.body;
    const userExist = await User.findByPk(id);

    if (!userExist) { throw new DBError(null, 'Usuario no encontrado', 400) }

    // if password doesnt change delete password from the object user
    if (userExist.user_pass === userData.user_pass){
        delete userData.user_pass;
    }else{
        // if password change encrypt user_password
        userData.user_pass = encryptPass( userData.user_pass );   
    }

    //add image name to userData
    userData.user_img = req.fileNameToSave;

    await User.update(
        userData,
        { where: {id: id} })
        .then( async( ) => {
            //Update the branch
            const branchUser = await Branch_User.findOne({where:{'UserId': id}});
            if(!branchUser) throw new DBError(null, 'Error: inconsistencia en la base de datos', 400)
                await Branch_User.update( 
                {
                    'BranchId': userData.BranchId,
                    'UserId': id
                },{
                where:{
                    UserId: id
                } })
                .catch( error => { throw new DBError(error, "Error al actualizar Branch_User") } );
        })
        .catch( error => {
            throw new DBError(error, "Error al actualizar el usuario.", 400)
        })

    resSuccessful(res, `Usuario ${userExist.user_name} actualizado correctamente`)
}
    
const deleteUser = async(req, res) => {
    const {id} = req.params;
    
    const userToDelete = await User.findByPk( id );
    if ( !userToDelete ) {throw new DBError(null, 'Usuario no encontrado', 404 )}

    await User.destroy({ where: { "id" : id} })
    .catch( error => { throw new DBError(error, 'Error al eliminar el usuario', 400) })
    
    if (userToDelete.user_img != 'defaultUserImage.png'){
        deleteImage(userToDelete.user_img);
    }

    resSuccessful(res, 'Usuario Eliminado correctamente')
}

const getOffset = (page, limit) => {
    return (page * limit) - limit;
}
   
const getNextPage = (page, limit, total) => {
    if ((total/limit) > page) {
        console.log('nextPage ' + (page + 1))
        return page + 1;
    }
    console.log('null')
    return null
}
   
const getPrevPage = (page) => {
    if (page <= 1) {
        console.log('null')
        return null
    }
    console.log('prevPage ' + (page - 1))
    return page - 1;
}

module.exports = {
    getUsers: catchedAsync(getUsers),
    getUser: catchedAsync(getUser),
    saveUser: catchedAsync(saveUser),
    updateUser: catchedAsync(updateUser),
    deleteUser: catchedAsync(deleteUser)
}
