
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
        this.statusCode = status,
        this.errorData = JSON.stringify(error).replaceAll('{', `{\n`)
        // this.errorData = JSON.stringify(error)
    }
}

class GeneralError extends Error{
    constructor(message, status = 500){
        super(message);
        this.statusCode = status
    }
}

module.exports = {
    LoginError,
    DBError,
    GeneralError
}