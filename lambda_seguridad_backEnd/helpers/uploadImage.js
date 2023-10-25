const multer = require('multer')
const { extname } = require('path');

const MIMETYPES = ['image/jpeg', 'image/png'];

const uploadImage = multer({



    //FILE NAME STORED
    storage: multer.diskStorage({
        destination: './data/img/public/',
        filename: (req, file, callBack) => {
            const fileExtension = extname( file.originalname );
            const fileName = file.originalname.split( fileExtension[0] );

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

module.exports = {
    uploadImage
}