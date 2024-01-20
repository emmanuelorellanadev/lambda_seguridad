//COMPANY CONTROLLER
const Company = require('../models/company_model');
const catchedAsync = require('../errors_handler/catchedAsync');
const { deleteImage } = require('../helpers/uploadImage');
const { resSuccessful } = require('../response/resSucessful');
const { DBError, GeneralError } = require('../errors_handler/errors');

const getCompanies = async(req, res) => {

    const companies = await Company.findAll();
        if ( !companies ) throw new DBError (null, 'No se encontraron empresas', 404)
        
        resSuccessful(res, companies)
}

const getCompany = async(req, res) => {
    const { id } = req.params;

    const company = await Company.findByPk(id);

    if( !company ) throw new DBError(null, "Empresa no encontrada", 404);
    
    resSuccessful(res, company)
}

const saveCompany = async(req, res) => {
        // const dataFile = req.file;
        // const company = Object.assign({}, req.body)// fix [Object: null prototype]{xxx: xxxx}
        const company = req.body;
        company.company_logo = req.fileNameToSave;

        await Company.create( company )
            .then( ({company_name, ...companySaved}) => {
                resSuccessful(res, `${company_name} guardada exitosamente`) })
            .catch( error => {
                deleteImage(company.company_logo);
                throw new DBError(error, 'Error al guardar la empresa', 400) })
            
}
    
const updateCompany = async(req, res) => {
    // const company = Object.assign({}, req.body)// fix [Object: null prototype]{xxx: xxxx}
        const { id } = req.params;
        const company = req.body
            
            const companyToUpdate = await Company.findByPk( id );
            
            if( !companyToUpdate ) throw new GeneralError('Error: Empresa no encontrada');
            
            //Add fileName to object to save
            company.company_logo = req.fileNameToSave;

            await Company.update(company, { where: { id: id }})
                .then( companyUpdated => resSuccessful(res, 'Empresa actualizada correctamente'))
                .catch( error => { throw new DBError(error, 'Error al actualizar la empresa.', 400) })
    }
    
const deleteCompany = async( req, res ) =>{
    const { id } = req.params;
        const companyToDelete = await Company.findByPk( id );

        if( !companyToDelete ) throw new DBError(null, 'Empresa no encontrada')

        await Company.destroy({ where: {id: id}});
            deleteImage(companyToDelete.company_logo);
            resSuccessful(res, 'Empresa eliminada correctamente');
            
}

module.exports = {
    getCompanies: catchedAsync(getCompanies),
    getCompany: catchedAsync(getCompany),
    saveCompany: catchedAsync(saveCompany),
    updateCompany: catchedAsync(updateCompany),
    deleteCompany: catchedAsync(deleteCompany),
}