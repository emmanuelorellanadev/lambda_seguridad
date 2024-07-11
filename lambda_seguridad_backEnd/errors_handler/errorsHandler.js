const { logFailedLogin, logError, logErrorDB } = require("../errors_handler/log_handler");
const { resError } = require("../response/resError");
const { dbError_handler } = require("./DBError/dbError_handler");
const { LoginError, DBError, GeneralError } = require("./errors");

const errorsHandler = async(error, res) => {
    
    console.log(error)

    if(error instanceof LoginError){
        console.error('Error. FailedLogin'.yellow)
        await logFailedLogin(error);
        
        }else if(error instanceof DBError){
            dbError_handler(error);
            await logErrorDB(error);

            }else if(error instanceof GeneralError){
                console.error('Error: GeneralError'.yellow)
                await logError(error);
                }else if (error instanceof Error){
                    console.error('Error: GeneralError'.yellow)
                    await logError(error);                   
                    }
    
    resError(error, res);

}

module.exports = {
    errorsHandler
}