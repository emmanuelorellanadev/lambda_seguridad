const multer = require('multer');
const { extname } = require('path');
const { unlink } = require('fs/promises');
const catchedAsync = require('../errors_handler/catchedAsync');
const { GeneralError } = require('../errors_handler/errors');

const MIMETYPES = ['image/jpeg', 'image/png'];

const uploadImage = multer({

    //FILE NAME STORED
    storage: multer.diskStorage({
        destination: './data/img/public/',
        filename: (req, file, callBack) => {
            const fileExtension = extname( file.originalname );
            const fileName = file.originalname.split( fileExtension );

            //create the filename to put it on the file and put the variable on the request
            const fileNameToSave = `${fileName[0]} - ${Date.now()}${fileExtension}`;
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
        fieldSize: 1000000 
    }
})

const deleteImage = async(img) => {
    if (img != 'defaultCompanyImage.png'){
        try {
            await unlink(`./data/img/public/${img}`)
            
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = {
    uploadImage,
    deleteImage: catchedAsync(deleteImage)
}
