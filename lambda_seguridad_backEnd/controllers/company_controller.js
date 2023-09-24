//COMPANY CONTROLLER
const Company = require('../models/company_model');
const multer = require('multer')
const { extname } = require('path');

const MIMETYPES = ['image/jpeg', 'image/png'];

const getCompanies = async(req, res) => {
    try {
        const companies = await Company.findAll();
        if ( !companies ) {
            return res.status(401).json({
                error: "Companies void"
            })
        }
        res.json({companies});
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

const getCompanyId = async(req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findByPk(id);

        if( !company ){
            throw "Company doesn't exist"
        }

        res.json({company});
    } catch (error) {
        res.status(400).json({error})
    }
}

const createCompany = async(req, res) => {
    try {
        // const dataFile = req.file;
        const company = Object.assign({}, req.body)// fix [Object: null prototype]{xxx: xxxx}
        company.logo= req.fileNameToSave;
        console.log(company);

        const companySaved = await Company.create({
            "company_name": company.company,
            "company_phone": company.phone,
            "company_address": company.address,
            "company_description": company.description,
            "company_mission": company.mission,
            "company_vision": company.vision,
            "company_logo": company.logo,
        });
            res.json({
                companySaved
                // "companySaved": 1
            })
        
    } catch (error) {
        res.status(401).json({
            error
        })
    }
    
}
    
const updateCompany = async(req, res) => {
        const { id } = req.params;
        const company = Object.assign({}, req.body)// fix [Object: null prototype]{xxx: xxxx}

        try {
            
            const companyToUpdate = await Company.findByPk( id );
            
            if( !companyToUpdate ){
                return res.status(401).json({
                    error: "Company doesn't exist."
                })
            }
            //Add fileName to object to save
            company.logo = req.fileNameToSave;

            const companyUpdated = await Company.update({
                "company_name": company.company,
                "company_phone": company.phone,
                "company_address": company.address,
                "company_description": company.description,
                "company_mission": company.mission,
                "company_vision": company.vision,
                "company_logo": company.logo,
            }, { where: { id: id }})
            res.json({companyUpdated})        
            // res.json({"status" : 1})        
        } catch (error) {
            // req.status(400).json(error); 
            console.log(error)
        }
    }
    
    const multerUpload = multer({
        //FILE NAME STORED
        storage: multer.diskStorage({
            destination: './data/img/company/',
            filename: (req, file, callBack) => {
                // console.log('pas[o por multerUpload')
                const fileExtension = extname( file.originalname );
                // console.log(fileExtension)
                const fileName = file.originalname.split( fileExtension[0] );
                // console.log(fileName)
                //create the filename to put it on the file and put the variable on the request
                const fileNameToSave = `${fileName} - ${Date.now()}${fileExtension}`;
                req.fileNameToSave = fileNameToSave;
                callBack( null, fileNameToSave); 
            }
        }),
        //FILE TYPE
        fileFilter: ( req, file, callBack) => {
            if ( MIMETYPES.includes( file.mimetype) ) callBack( null, true)
            else callBack( new Error( `Only ${MIMETYPES.join('')} mimetypes are acepted`)) 
        },
        //FILE SIZE
        limits: {
            fieldSize: 2000000 
        }
    })

const deleteCompany = async( req, res ) =>{
    const { id } = req.params;
    // const id = req.body;
    console.log(req.body)
    try {
        const companyToDelete = await Company.findByPk( id );

        if( !companyToDelete ){
            return res.status(401).json({
                error: "Company doesn't exist"
            })
        }

        const companyDestroy = await Company.destroy({ where: {id: id}})
        res.json({companyToDelete})
    } catch (error) {
        console.log(error);

    }
}

// const uploadImage = multer.diskStorage({
//     destination: function ( req, file, cb){
//         cb( null, '../data/img/company' )
//     },
//     filename: function (req, file, cb) {
//         cb( null, `${Date.now()} - ${file.originalname}` )
//     }
// })
// const upload = multer({ uploadImage: uploadImage});
// module.exports.upload = upload.single('img');




module.exports = {
    getCompanies,
    getCompanyId,
    createCompany,
    updateCompany,
    deleteCompany,
    multerUpload
}