const mysql = require("mysql");
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: "root",
    password: "123456",
    database: "gome"
})

const exec = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        // 创建连接对象
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log("数据库连接失败:" + err.message);
                reject(err.message);
            }
            conn.query(sql, params, function (err, result) {
                if (err) {
                    console.log("执行sql语句失败:" + err.result);
                    reject(err.message);
                }
                resolve(result);
                // 释放链接
                conn.release();
            })
        })
    })
}

// 暴露出去
module.exports = { exec };