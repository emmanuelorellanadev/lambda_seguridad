

const checkUserFields = async (req, res, next) => {
    console.log('body'.yellow);
    console.log(req.body);
    next();
}

module.exports = checkUserFields;