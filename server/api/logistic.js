// 引入区块链
const chain = require('../blockchain/linkchain')

// 抽取路由
const express = require('express');
const bodyparser = require('body-parser');

// 引入数据库
const db = require('../utils/db')
const jwt = require('../utils/makeToken')

const routerApp = express.Router();

// 把bodyparser添加到app中
routerApp.use(bodyparser.urlencoded({ extended: false }));//false接收的值为字符串或者数组，true为任意类型
routerApp.use(bodyparser.json());//解析post为json格式
// 用户信息验证

routerApp.post('/warehouse', (req, res) => {
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
// 返回用户名下所有仓库
routerApp.post('/warehouse/get', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then(((data) => {
        return new Promise((resolve, reject) => {
            let sql = `select * from warehouse where username = "${data.username}"`
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
//添加仓库信息
routerApp.post('/warehouse/add', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then(((data) => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO warehouse (warehouse_name,warehouse_address,storage_capacity,contact_person,contact_info,passware,`level`,username) value (?,?,?,?,?,?,?,?)"
            let params = [
                body.name,
                body.addr,
                body.total,
                body.person,
                body.desc,
                body.passware,
                body.level,
                data.username
            ]
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


// 获取入库申请
routerApp.post('/warehouse/getgoods', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then(((data) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT\
            goods.goods_id, goods_name, goods.username, companyname, warehouse.warehouse_id, warehouse_name, entry_time, goods.status\
            FROM\
            goods, company, inventory, warehouse\
            WHERE\
            goods.goods_id IN(\
                SELECT\
		goods_id \
	    FROM\
		inventory \
        WHERE\
	    warehouse_id IN(SELECT warehouse_id FROM warehouse WHERE username = '${data.username}'))\
	    AND goods.username = company.username and goods.goods_id = inventory.goods_id and inventory.warehouse_id = warehouse.warehouse_id`
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
// 处理入库申请
routerApp.post('/warehouse/entry', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        changeStatus(body.status, body.goods_id)
        res.json({
            status: 'ok'
        })
    })
})
// 改变货物状态
function changeStatus(status, goodsid) {
    let sql = "update goods set status = ? where goods_id = ?"
    let params = [status, goodsid]
    new db('supplychain').change(sql, params)
}
// 处理出库申请
routerApp.post('/warehouse/out', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        changeStatus(body.status, body.goods_id)
        res.json({
            status: 'ok'
        })
    })
})

routerApp.post('/warehouse/del', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        console.log(body)
        let sql = `delete from warehouse where warehouse_id = ${body.warehouse_id}`;
        new db('supplychain').remove(sql);
        res.json({
            status: 'ok'
        })
    })
})
async function genBlockCD(hzhusername, wlusername, desc, fun) {
    let hzaddr = await new Promise((resolve, reject) => {
        let sql = `select * from company where username = "${hzhusername}"`
        new db('supplychain').query(sql, (err, rows) => {
            resolve(rows[0].hash)
        })
    })
    let wladdr = await new Promise((resolve, reject) => {
        let sql = `select * from company where username = "${wlusername}"`
        new db('supplychain').query(sql, (err, rows) => {
            resolve(rows[0].hash)
        })
    })
    let shortName = "goods1";
    let hyaddr = await new Promise((resolve, reject) => {
        chain.deploy(wladdr, desc, shortName, (addr) => {
            resolve(addr)
        })
    })
    // 资产上链
    await chain.add(wladdr, hyaddr, wladdr)
    console.log({
        wl: wladdr,
        addr: hyaddr,
        hz: hzaddr
    })
    chain.tran(wladdr, hyaddr, hzaddr)
    await fun(hyaddr)
}

routerApp.post('/warehouse/gen', (req, res) => {
    let body = req.body;
    new Promise((resolve, reject) => {
        jwt.verify(body.token, (err, data) => {
            resolve(data);
        })
    }).then((data) => {
        let sql = `SELECT * from goods WHERE goods_id =${body.goods_id}`;
        new db('supplychain').query(sql, (err, dat) => {
            let text = `${dat[0].goods_brand}品牌${dat[0].goods_name}，制造商${dat[0].manufacturer}，共${dat[0].total_quantity}${dat[0].unit}，出厂价每${dat[0].unit}${dat[0].unit_price}元，备注：${dat[0].desc}`
            console.log(text)
            genBlockCD(dat[0].username, data.username, text, (addr) => {
                sql = "insert into warehousereceipt (status,goods_id,hash,username) values (?,?,?,?)"
                let params = [
                    "未质押", body.goods_id, addr, dat[0].username,
                ]
                new db('supplychain').add(sql, params)
                changeStatus("已生成仓单", body.goods_id)
                res.json({
                    status: 'ok'
                })
            })
        })
        // let sql = `delete from warehouse where warehouse_id = ${body.warehouse_id}`;
        // new db('supplychain').remove(sql);
    })
})

routerApp.get('/getDataByHash', (req, res) => {
    let addr = req.query.addr
    chain.getInfo(addr, (data) => {
        res.json({
            data: data.data[0]
        })

    })
})



module.exports = routerApp;