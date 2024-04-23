const catchedAsync = require("../errors_handler/catchedAsync");
const Log = require("../models/log_model");


const getLog = async() => {

    const logs = await Log.findAll();
    if ( !logs ) throw new DBError (null, 'No se encontraron registros', 404)
    
    resSuccessful(res, logs)
}

module.exports = {
    getLog: catchedAsync(getLog)
}