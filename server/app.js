const express = require("express");

const app = express()


const port = 5080

const login = require('./api/login')
const userlist = require('./api/userlist')
const goods = require('./api/goods')
const logistic = require('./api/logistic')
const apply = require('./api/applys')

// 添加登录接口
app.use(login)
app.use(userlist)
app.use(goods)
app.use(logistic)
app.use(apply)


app.listen(port, () => {
    console.log(`运行在http://localhost:${port}`)
})