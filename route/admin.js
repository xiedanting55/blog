const express = require('express');
const admin = express.Router();

admin.get("/login", require("./admin/loginPage"));

admin.post("/login", require("./admin/login"));

admin.get("/user", require("./admin/userPage"));

admin.get("/user-edit", require("./admin/user-edit"));

admin.post("/user-edit", require("./admin/user-edit-fn"));

admin.get("/logout", require("./admin/logout"));

module.exports = admin;