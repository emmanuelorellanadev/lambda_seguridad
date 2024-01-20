
const resSuccessful = (res, resData, status = 200) => {

    res.status(status).json({
        resData
    })
}

module.exports = {resSuccessful}