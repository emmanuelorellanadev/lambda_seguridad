
const resError = async(error, res) => {

    //if the status code doesnt come whit the error asign status 500
    if(!error.statusCode) error.statusCode = 500;

    res.status(error.statusCode).json({
        status: "FAILED",
        name: error.name,
        error: error.message,
        errorLambda: error.errorLambda
    })
}

module.exports = {
    resError,
} 