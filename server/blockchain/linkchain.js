const axios = require('axios');
const fs = require('fs/promises')
const bac = require('./bac002')


axios.defaults.headers["Content-Type"] = "application/json";
// 获取token
async function getToken() {
    let token = await fs.readFile('token.txt', { encoding: 'utf8' })
    if (token == '') {
        token = await new Promise((resolve, reject) => {
            axios.get('http://192.168.147.133:5000/mgr/WeBASE-Node-Manager/account/pictureCheckCode')
                .then(response => {
                    // console.log(response.data.data.token)
                    resolve(response.data.data.token);
                })
                .catch(error => {
                    console.log(error);
                });
        })
        const form = new FormData();
        // 配置文件
        form.append("account", "linco");
        form.append("accountPwd", "6125daff4ab680f3ffe9500aa46ad388f52cd519e1eddd5d2077f6cb90ec0d1b");
        const options = {
            method: 'POST',
            url: 'http://192.168.147.133:5000/mgr/WeBASE-Node-Manager/account/login',
            params: { checkCode: '8888' },
            headers: {
                'Content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                token: token,
                'content-type': 'multipart/form-data'
            },
            data: form
        };
        token = await axios.request(options);
        token = token.data.data.token;
        await fs.writeFile('token.txt', token);
    }
    return "Token " + token
}
// 添加区块链用户
async function addUser(username, desc, fun) {
    // desc存用户数据信息
    let token = await getToken();
    let options = {
        method: 'POST',
        url: 'http://192.168.147.133:5000/mgr/WeBASE-Node-Manager/user/userInfo',
        headers: {
            AuthorizationToken: token,
            'Content-Type': 'application/json',
            'content-type': 'application/json'
        },
        data: { groupId: '1', userName: username, description: desc, account: 'linco' }
    };
    axios.request(options).then(function (response) {
        let addr = response.data.data.address;
        fun(addr)
    }).catch(function (error) {
        console.error(error);
    });
}
// 部署智能合约
async function deploy(user, desc, shortName, fun) {
    // desc存货物信息
    let token = await getToken();
    bac.deploy(token, user, desc, shortName, fun)
}
async function add(user, addr, to) {
    let assetID = 10
    let assetDesc = "添加的第二个货物"
    let assetData = "{data:two}"
    let token = await getToken();
    bac.add(token, addr, user, to, assetID, assetDesc, assetData)
}

async function tran(from, addr, to) {
    let asset = 10
    let msg = "转账信息"
    let token = await getToken();
    bac.tran(token, addr, from, to, asset, msg)
}
async function getOwner(addr, fun) {
    let assetID = 10
    let token = await getToken();
    bac.getOwner(token, addr, assetID, fun)
}

async function getInfo(addr, func) {
    let token = await getToken();
    bac.getInfo(token, addr, func)
}
module.exports = { getToken, addUser, deploy, add, tran, getOwner, getInfo }



// base64加密
// fs.readFile('./blockchain/BAC002/BAC002.sol', { encoding: 'utf8' }).then((data) => {
//     const buff = Buffer.from(data, 'utf-8');

//     // encode buffer as Base64
//     const base64 = buff.toString('base64');

//     // print Base64 string
//     console.log(base64);
// })








