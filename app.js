const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  //处理post参数
const session = require('express-session');
const app = express();
const port = 80;

require("./model/connect");
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ 
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    secret: 'secret key'
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'));

app.use(express.static(path.join(__dirname, 'public')))

const home = require('./route/home');
const admin = require('./route/admin');

app.use("/admin", require("./middleware/loginGuard"));

app.use("/home", home);
app.use("/admin", admin);

app.use((err, req, res, next) => {
    const result = JSON.parse(err)
    res.redirect(`${result.path}?message=${result.message}`)
})


app.listen(port, ()=> {
    console.log(`服务器启动----${port}`);
})