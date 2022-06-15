const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

module.exports = {
    User
};