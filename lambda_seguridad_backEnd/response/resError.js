
const resError = async(error, res) => {

    //if the status code doesnt come whit the error asign status 500
    if(!error.statusCode) error.statusCode = 500;

    res.status(error.statusCode).json({
        error: true,
        errors: error.message,
        name: error.name
    })
}

module.exports = {
    resError,
} 