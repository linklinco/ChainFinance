const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "secret12345" // 这是加密的key（密钥）


function sign(content) {
    const token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 24  // 24小时过期
    })
    return token;
}

function verify(token, fun) {
    jwt.verify(token, secretOrPrivateKey, (err, data) => {
        fun(err, data);
    })
}

module.exports = { sign, verify }
