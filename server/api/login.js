// 抽取路由
const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "secret12345" // 这是加密的key（密钥） 
// 引入数据库
const db = require('../utils/db')
const routerApp = express.Router();

// 把bodyparser添加到app中
routerApp.use(bodyparser.urlencoded({ extended: false }));//false接收的值为字符串或者数组，true为任意类型
routerApp.use(bodyparser.json());//解析post为json格式

// 登录路由
routerApp.post('/login', (req, res) => {
    let body = req.body;
    let sql = `select * from company where username ='${body.username}'`
    new db('supplychain').query(sql, (err, rows) => {
        if (rows.length === 0) {
            // res.setHeader('Content-Type', 'application/json;charset=utf-8')
            // console.log("不存在用户")
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.json({
                status: 'error',
            })
        } else if (rows[0].password == body.password && rows[0].usertype == body.usertype) {
            //jwt生成token
            const content = { username: body.username }// 要生成token的主题信息
            const token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 24  // 24小时过期
            })
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.json({
                status: 'ok',
                data: {
                    token: token,
                    user: rows[0]
                }
            })
        } else {
            // res.setHeader('Content-Type', 'application/json;charset=utf-8')
            // res.send("登录失败");
            res.json({
                status: 'error',
            })
        }
    })
})


// 注册路由
routerApp.post('/register', (req, res) => {
    let body = req.body;
    let sql = 'insert into company \
     (username,password,companyname,companyID,companyhome,man,phone,email,usertype,state,hash)\
     values (?,?,?,?,?,?,?,?,?,"注册",-1)';
    new db('supplychain').add(sql, Object.values(body));
    res.json({
        status: 'ok'
    })
})

module.exports = routerApp;