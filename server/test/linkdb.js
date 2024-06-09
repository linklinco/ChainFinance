const db = require('../utils/db')

sql = "select * from user";
new db('supplychain').query(sql, (err, rows) => {
    rows.forEach(element => {
        console.log(element)
    });
})

// sql = 'insert into user (username,password,companyname,companyID,where,man,phone,email,usertype,state,id)     values (?,?,?,?,?,?,?,?,?,"注册",-1)'
// params = ['放热峰', '不同', '', '', '', '', '', '', 1]
// db().add(sql, parms)

// sql = 'update user set username = ? where id = ?'
// params = ['wang', 13]
// db.change(sql, params)

// sql = 'delete from user where username = "wang"'
