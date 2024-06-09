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


routerApp.post('/users', (req, res) => {
    let body = req.body;
    jwt.verify(body.token, (err, data) => {
        let sql = 'select * from company'
        new db('supplychain').query(sql, (err, rows) => {
            res.json(Array.from(rows))
        })
    })
})

routerApp.post('/changeUsers', (req, res) => {
    let body = req.body;
    jwt.verify(body.token, (err, data) => {
        if (data.username != 'admin') {
            res.json({
                status: 'error'
            });
            return;
        };
        let sql = `select companyname,companyID from company where username = "${body.username}"`
        new db('supplychain').query(sql, (err, data) => {
            let desc = JSON.stringify({
                company: data[0].companyname,
                id: data[0].companyID
            })
            let username = body.username;
            chain.addUser(username, desc, (data) => {
                sql = `update company set state = ?,hash= ? where username = ? `;
                let params = [body.state, data, body.username];
                new db('supplychain').change(sql, params);
                res.json({
                    status: 'ok'
                })
            })
        })

    })
})

routerApp.post('/delectUser', (req, res) => {
    let body = req.body;
    jwt.verify(body.token, (err, data) => {
        if (data.username != 'admin') {
            res.json({
                status: 'error'
            });
            return;
        };
        // 删除sql
        let username = body.username;
        let sql = `delete from company where username = "${username}"`
        new db('supplychain').remove(sql);
        res.json({
            status: 'ok'
        })
    })
})

module.exports = routerApp;