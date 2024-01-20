const { appendFile } = require('fs/promises');
const catchedAsync = require('./catchedAsync');

const logSuccessfulLogin = async(user, RoleId) => {
    const url = `./data/logs/security.log`
        
        const e = (`\n ${Date()} SUCCESSFUL LOGIN ${user} whit Role ${RoleId} `);

        await appendFile(url, e, {flag: 'a'})
}

const logFailedLogin = async(error) => {
    let url = ''
    let e = ''
    if (error.name == 'LoginError') {
        url = `./data/logs/security.log`
        
        e = (`\n ${Date()} ${error.name} ${error.message}`);
    }else{
        url = `./data/logs/lambdaError.log`

        e = (`\n ${Date()} ${error.name}  \n ${error} \n ${error.message} \n ${error.stack}`);
    }    
        await appendFile(url, e, {flag: 'a'})
}

const logError = async( error ) => {
    const url = `./data/logs/lambdaError.log`
    let e = (`\n ${Date()} \n ${error} \n ${error.name} \n ${error.errorData} \n ${error.stack}`);

        await appendFile(url, e, {flag: 'a'})
    }
    
const logErrorDB = async( error ) => {
    const url = `./data/logs/lambdaError.log`
    let e = (`\n ${Date()} \n ${error} \n ${error.name} \n ${error.errorData} \n ${error.stack}`);

        await appendFile(url, e, {flag: 'a'})
    }

module.exports = {
    logFailedLogin: catchedAsync(logFailedLogin),
    logSuccessfulLogin: catchedAsync(logSuccessfulLogin),
    logErrorDB: catchedAsync(logErrorDB),
    logError: catchedAsync(logError)
}