const { logFailedLogin, logError, logErrorDB } = require("../errors_handler/log_handler");
const { resError } = require("../response/resError");
const { error_db_unique } = require("./DBError/error_db_unique");
const { LoginError, DBError, GeneralError } = require("./errors");

const errorsHandler = async(error, res) => {
    
    console.log(error)

    if(error instanceof LoginError){
        console.error('Error. FailedLogin'.yellow)
        await logFailedLogin(error);
        
        }else if(error instanceof DBError){
            error_db_unique(error);
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