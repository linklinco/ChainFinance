// 抽取路由
const express = require('express');
const bodyparser = require('body-parser');
// 引入数据库
const db = require('../utils/db')
const jwt = require('../utils/makeToken')

// 引入区块链
const chain = require('../blockchain/linkchain')

const routerApp = express.Router();

// 把bodyparser添加到app中
routerApp.use(bodyparser.urlencoded({ extended: false }));//false接收的值为字符串或者数组，true为任意类型
routerApp.use(bodyparser.json());//解析post为json格式
// 用户信息验证


// 获取所有仓单的质押信息
routerApp.post('/apply/get', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then(((data) => {
        return new Promise((resolve, reject) => {
            let sql = `select * from goods where username = "${data.username}"`
            new db('supplychain').query(sql, (err, rows) => {
                resolve(rows)
            })
        })
    })).then((data) => {
        res.json(Array.from(data))
    }).catch((reson) => {
        res.json({
            status: 'error'
        })
    })
})

module.exports = routerApp;