const express = require('express');
const router = expres.Router();

router
    .route("/")
    .get((req, res) => {
        // res.json({
        //     "hello": "hello"
        // })
        res.send(`<h1>Hello desde ${req.baseUrl}</h1>`)
    })



module.exports = router