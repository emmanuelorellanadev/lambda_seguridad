const error_db_unique = (error) => {
    console.error('Error: DBError'.yellow);
    
    const errorData = JSON.parse(error.errorData);
        if (errorData?.name == 'SequelizeUniqueConstraintError'){
            error.errorLambda = "El registro ya se encuentra guardado."
            console.log(error.errorLambda)
        }
}

module.exports = {error_db_unique}