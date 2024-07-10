
class LoginError extends Error{
    constructor (message, status = 400){
        super(message);
        this.name = "LoginError";
        this.statusCode = status;
    }
}

class DBError extends Error{
    constructor (error, message, status = 400){
        super(message),
        this.name = 'DBError',
        this.details = '',
        this.statusCode = status,
        this.errorData = JSON.stringify(error).replaceAll('{', `{\n`)
        this.errorLambda = ''
    }
}

class GeneralError extends Error{
    constructor(message, status = 400){
        super(message),
        this.statusCode = status
    }
}

module.exports = {
    LoginError,
    DBError,
    GeneralError
}