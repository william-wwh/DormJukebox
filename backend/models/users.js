const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, 'user.json');

const userList = {
    app: (userName) => {
        return new Promise((resolve, reject) => {
            fs.readFile(userFilePath, (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {                    // 如果错误代码是'ENOENT',表示文件不存在      
                        fs.writeFile(userFilePath, '[]', err => {     // 创建空的用户文件      
                            if (err) {                                  // 如果创建文件出错
                                reject(-1);
                            } else {                                    // 否则,创建新用户对象
                                const users = [];
                                const userId = 1; // 初始 userId 为 1
                                users.push({ id: userId, name: userName, admin: true });
                                const updatedData = JSON.stringify(users);        // 将用户数据字符串化
                                fs.writeFile(userFilePath, updatedData, err => {  // 写入文件
                                    if (err) {          // 如果写入文件出错
                                        reject(-1);
                                    } else {            // 否则,返回成功消息
                                        resolve({ userId: userId, isAdmin: true });
                                    }
                                });
                            }
                        });
                    } else {                    // 其他错误,返回错误消息
                        reject(-1);
                    }
                } else {                      // 如果文件存在
                    const users = JSON.parse(data);                 // 解析现有用户数据      
                    const existingUser = users.find(u => u.name === userName); // 查找是否已存在同名用户
                    console.log("existingUser", existingUser)
                    if (existingUser) {
                        resolve({ userId: existingUser.id, isAdmin: existingUser.admin }); // 如果存在同名用户，返回其 ID
                    } else {
                        const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1; // 获取新的 userId
                        users.push({ id: userId, name: userName, admin: false });     // 添加新用户 
                        const updatedData = JSON.stringify(users);      // 将更新后的数据字符串化   
                        fs.writeFile(userFilePath, updatedData, err => {    // 写入文件 
                            if (err) {                // 如果写入文件出错
                                reject(-1);
                            } else {
                                resolve( { userId: userId, isAdmin: false });
                            }
                        });
                    }
                }
            });
        });
    },
    query: (userId) => {
        return new Promise((resolve, reject) => {
            fs.readFile(userFilePath, (err, data) => {
                if (err) {
                    reject(-1);
                } else {
                    const users = JSON.parse(data);// 解析用户数据
                    const user = users.find(u => u.id === parseInt(userId));// 查找指定 userId 的用户
    
                    if (user) {
                        resolve({ name: user.name, isAdmin: user.admin });// 返回用户名
                    } else {
                        reject(-1);// 如果找不到用户，返回 -1 状态码
                    }
                }
            });
        });
    },
}
module.exports = userList