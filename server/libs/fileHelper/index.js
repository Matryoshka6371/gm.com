const fs = require("fs");
const getData = (path) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (!err) {
                resolve(data.toString())
                // 将buffer数据转换为字符串

            } else {
                reject(err.message);
            }
        })
    })
}
const setData = (path, data) => {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, function (err) {
            if (!err) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

module.exports = {
    getData,
    setData
}