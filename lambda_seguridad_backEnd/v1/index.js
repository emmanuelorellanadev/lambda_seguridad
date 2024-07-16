const express = require("express");

const router = expres.Router();

router.route("/").get((req, res) => {
        res.send(`<h1>Hello desde ${req.baseUrl}</h1>`)
    })



module.exports = router