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

routerApp.post('/goods', (req, res) => {
    let body = req.body;
    console.log(body);
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then(((data) => {
        return new Promise((resolve, reject) => {
            let sql = `select * from company where username = "${data.username}"`
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
// 货物获取接口，获取用户名下的所有货物信息
routerApp.post('/goods/get', (req, res) => {
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


// 货物登记接口，融资企业通过此接口添加货物
routerApp.post('/goods/add', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then(((data) => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO goods (goods_name,goods_type,goods_brand,manufacturer,unit,unit_price,total_quantity,username,`desc`,`status`) VALUES (?,?,?,?,?,?,?,?,?,?)"
            let params = [body.goods_name,
            body.goods_type,
            body.goods_brand,
            body.manufacturer,
            body.util,
            body.unit_price,
            body.total_quantity,
            data.username,
            body.desc,
                "登记成功"]
            new db('supplychain').add(sql, params)
            resolve('ok')
        })
    })).then((data) => {
        res.json({
            status: 'data'
        })
    }).catch((reson) => {
        res.json({
            status: 'error'
        })
    })
})

routerApp.post('/goods/del', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        let goodsid = body.goods_id
        let sql = `delete from goods where goods_id = ${goodsid}`
        new db('supplychain').remove(sql);
        res.json({
            status: "ok"
        })
    })
})
// 获得所有物流企业
routerApp.get('/getAllLogistic', (req, res) => {
    let sql = "SELECT username,companyname FROM company WHERE usertype = '物流企业'"
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows)
    })
})
// 获得所有金融企业
routerApp.get('/getAllBanks', (req, res) => {
    let sql = "SELECT username,companyname FROM company WHERE usertype = '金融企业'"
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows)
    })
})
// 获得某个物流企业名下仓库
routerApp.get('/getwarehouse', (req, res) => {
    let sql = `SELECT warehouse_id,warehouse_name FROM warehouse WHERE username = '${req.query.username}'`
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows)
    })
})
// 改变货物状态
function changeStatus(status, goodsid) {
    let sql = "update goods set status = ? where goods_id = ?"
    let params = [status, goodsid]
    new db('supplychain').change(sql, params)
}
// 插入入库申请单
routerApp.post('/goods/entry', (req, res) => {
    let body = req.body;
    let sql = 'INSERT INTO inventory (goods_id,warehouse_id,entry_time) VALUES (?,?,?);'
    let params = [body.goodsid, body.warehouse, body.entrytime]
    new db('supplychain').add(sql, params)
    changeStatus("申请入库中", body.goodsid)
    res.json({
        status: 'ok'
    })
})

// 修改出库申请
routerApp.post('/goods/out', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        changeStatus("申请出库中", body.goodsid)
        res.json({
            status: 'ok'
        })
    })
})

// 响应生成仓单
routerApp.post('/goods/gen', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        changeStatus("待生成仓单", body.goodsid)
        console.log(body)
        res.json({
            status: 'ok'
        })
    })
})

// 响应生成仓单
routerApp.post('/goods/backgen', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        changeStatus("已入库", body.goodsid)
        console.log(body)
        res.json({
            status: 'ok'
        })
    })
})

// 获得所有物流企业
routerApp.get('/getGoodByid', (req, res) => {
    let sql = "SELECT warehouse_receipt_id,goods_name,goods_type,goods_brand,manufacturer,total_quantity,unit,unit_price,`desc`,`hash` from goods JOIN warehousereceipt on goods.goods_id= warehousereceipt.goods_id WHERE goods.goods_id = +" + req.query.goodsID
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows)
    })
})
routerApp.get('/getCompanyByid', (req, res) => {
    let sql = "SELECT companyname,companyhome,phone FROM company where username in (SELECT username from goods WHERE goods_id=" + req.query.goodsID + ")"
    console.log(sql);
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows[0])
    })
})
routerApp.get('/getLogisticByid', (req, res) => {
    let sql = "SELECT companyname,companyhome,phone from company WHERE username in (SELECT username FROM warehouse where warehouse_id in(SELECT warehouse_id FROM inventory WHERE goods_id = " + req.query.goodsID + "))"
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows[0])
    })
})
routerApp.get('/getWarehouseByid', (req, res) => {
    let sql = "SELECT * from warehouse where warehouse_id in(SELECT warehouse_id FROM inventory WHERE goods_id =" + req.query.goodsID + ")"
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows[0])
    })
})

routerApp.get('/getAddrByid', (req, res) => {
    let sql = "SELECT * FROM `warehousereceipt` WHERE goods_id =" + req.query.goodsID
    console.log(sql)
    new db('supplychain').query(sql, (err, rows) => {
        res.json(rows[0])
    })
})

async function changeOwner(hwhash, tohash) {
    let username = await new Promise((resolve, reject) => {
        let sql = `SELECT username FROM company WHERE hash = '${tohash}'`
        console.log(sql)
        new db('supplychain').query(sql, (err, rows) => {
            resolve(rows[0].username)
        })
    })
    let goods = await new Promise((resolve, reject) => {
        let sql = `SELECT username,goods_id FROM warehousereceipt WHERE hash = '${hwhash}'`
        console.log(sql)
        new db('supplychain').query(sql, (err, rows) => {
            resolve(rows[0])
        })
    })

    let sql = "update warehousereceipt set username = ? where goods_id = ?"
    let params = [username, goods.goods_id]
    new db('supplychain').change(sql, params)
    sql = "update goods set username = ? where goods_id = ?"
    new db('supplychain').change(sql, params)

}


routerApp.post('/goods/tran', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        // 转移电子仓单拥有者
        chain.tran(body.addr, body.hash, body.to)
        // 修改数据库
        changeOwner(body.hash, body.to)
        res.json({
            status: 'ok'
        })
    })
})
routerApp.post('/goods/getmoney', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        let sql = "update warehousereceipt set money = ?,status=?,bank=? where hash = ?"
        let params = [body.money, "申请质押", body.bank, body.hash]
        new db('supplychain').change(sql, params)
        // // 转移电子仓单拥有者
        // chain.tran(body.addr, body.hash, body.to)
        // // 修改数据库
        // changeOwner(body.hash, body.to)
        res.json({
            status: 'ok'
        })
    })
})
module.exports = routerApp;