const express = require('express');
const admin = express.Router();

admin.get("/", (req, res) => {
    res.send("欢迎来到admin页面")
})

module.exports = admin;