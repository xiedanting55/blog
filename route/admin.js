const express = require('express');
const bcrypt = require('bcrypt');
const admin = express.Router();
const {User} = require("../model/user");

admin.get("/login", (req, res) => {
    res.render('admin/login')
})

admin.post("/login", async (req, res) => {
    const {email, password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render("admin/error", {msg: '邮箱地址或者密码错误'});
    }
    let user = await User.findOne({email});
    if(user) {
        let isValid = bcrypt.compare(password, user.password);
        if(isValid) {
            req.session.username = user.username;
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
        } else {
            return res.status(400).render("admin/error", {msg: '邮箱地址或者密码错误'}); 
        }
    } else {  //获取不到
        return res.status(400).render("admin/error", {msg: '邮箱地址或者密码错误'}); 
    }
})

admin.get("/user", (req, res) => {
    res.render('admin/user')
})

module.exports = admin;