const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true, //唯一值
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {// admin 超级管理员 normal 普通用户
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0 // 0启用 1禁用
    }
})

const User = mongoose.model('User', userSchema)

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const result = await User.create({
        username: "xiedanting",
        email: "974193605@qq.com",
        password: pass,
        role: "admin",
        state: 0
    })
}
// createUser();
const validateUser = user => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required().error(new Error("用户名不符合规则")),
        email: Joi.string().email().required().error(new Error("邮箱格式不符合要求")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error("密码格式不符合要求")),
        role: Joi.string().valid('normal', 'admin').required().error(new Error("角色值非法")),
        state: Joi.number().valid(0, 1).required().error(new Error("状态值非法"))
    })
    return schema.validateAsync(user); 
}



module.exports = {
    User,
    validateUser
};