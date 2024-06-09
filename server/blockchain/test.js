const chain = require('./linkchain.js')
const db = require('../utils/db.js')

// async function genBlockCD(hzhusername, wlusername, desc, fun) {
//     let hzaddr = await new Promise((resolve, reject) => {
//         let sql = `select * from company where username = "${hzhusername}"`
//         new db('supplychain').query(sql, (err, rows) => {
//             resolve(rows[0].hash)
//         })
//     })
//     let wladdr = await new Promise((resolve, reject) => {
//         let sql = `select * from company where username = "${wlusername}"`
//         new db('supplychain').query(sql, (err, rows) => {
//             resolve(rows[0].hash)
//         })
//     })
//     let shortName = "goods1";
//     let hyaddr = await new Promise((resolve, reject) => {
//         chain.deploy(wladdr, desc, shortName, (addr) => {
//             resolve(addr)
//         })
//     })
//     // 资产上链
//     await chain.add(wladdr, hyaddr, wladdr)
//     fun(hyaddr)
// }
// genBlockCD("sdrz", "jxwl", "货物信息", (addr) => {
//     console.log(addr)
// })

// 1.创建两个用户
// let user = "uesrone2"
// chain.addUser(user, "描述", (data) => {
//     user = data;
//     console.log(user)
// })
// let use1 = '0xc3e48a3f63a428fafe4bfb5cf489fabfb1f88eab'
// let use2 = '0x506d0b43742bb912884bdf9bec2a6018123f8c40'
// let desc = "代码创建的货物"
// let shortName = "goods1"
// 2.部署智能合约
// chain.deploy(use1, desc, shortName, (addr) => {
//     console.log(addr)
// })
let addr = "0x372d8c22ed232d9e580ffccf01a67124e77a081f"
chain.getInfo(addr, (data) => {
    console.log(data.data[0])
})
// 资产上链
// chain.add(use1, addr, use1)

// let to = '0x8afabc840ed28a570fb65097ffb166b50ca8ce4a'

// chain.tran(use1, addr, use2)
// chain.tran(use2, addr, use1)
// chain.getOwner(addr, (data) => {
//     console.log(data)
// })