const dbError_handler = (error) => {
    console.error('Error: DBError'.yellow);
    
    const errorData = JSON.parse(error.errorData);
        if (errorData?.name == 'SequelizeUniqueConstraintError'){
            error.errorLambda = "El registro ya se encuentra guardado."
        }
        if (errorData?.name == 'SequelizeDatabaseError'){
            error.errorLambda = `${errorData.parent.code}`
        }
}

module.exports = {dbError_handler}