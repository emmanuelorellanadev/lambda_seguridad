const { InstanceError } = require("sequelize");
const { logFailedLogin, logError, logErrorDB } = require("../errors_handler/log_handler");
const { resError } = require("../response/resError");
const { LoginError, DBError, GeneralError } = require("./errors");

const errorsHandler = async(error, res) => {
    
    console.error(error);
    // console.log(error);

    if(error instanceof LoginError){
        console.error('error logFailedLogin'.yellow)
        await logFailedLogin(error);
        
        }else if(error instanceof DBError){
            console.error('Error: DBError'.yellow);
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