const express = require('express');
const path = require('path');
const app = express();
const port = 80;

app.use(express.static(path.join(__dirname, 'public')))

const home = require('./route/home');
const admin = require('./route/admin');

app.use("/home", home);
app.use("/admin", admin);


app.listen(port, ()=> {
    console.log(`服务器启动----${port}`);
})