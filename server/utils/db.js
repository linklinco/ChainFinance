const mysql = require('mysql');

class Db {
    constructor(database) {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: database
        })
    }
    // 增加
    add(sql, params) {
        this.pool.getConnection((err, connection) => {
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log('error')
                }
                connection.release();
            })
        })
    }
    // 删除
    remove(sql) {
        this.pool.getConnection((err, connection) => {
            connection.query(sql, (err, rows) => {
                connection.release();
            })
        })
    }
    //修改
    change(sql, params) {
        this.pool.getConnection((err, connection) => {
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log('error')
                }
                connection.release();
            })
        })
    }
    //查找
    query(sql, callback) {
        this.pool.getConnection((err, connection) => {
            connection.query(sql, (err, rows) => {
                callback(err, rows);
                connection.release();
            })
        })
    }
}

// sql = 'select * from text';

// qurey(sql, (err, rows) => {
//     rows.forEach(element => {
//         console.log(element.title);
//     });
// })

module.exports = Db