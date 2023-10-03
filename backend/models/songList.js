const fs = require('fs');
const path = require('path');
const userList = require('./users');
const songFilePath = path.join(__dirname, 'data.json'); // 定义数据文件路径

const songList = {
    append: (songId, userId) => {
        fs.readFile(songFilePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') { // 文件不存在
                    const songsData = {
                        userIds: [userId],
                        songIds: [songId]
                    }; // 添加歌曲到空数组
                    // console.log("songsData"+songsData);
                    fs.writeFile(songFilePath, JSON.stringify(songsData), (err) => {// 将更新后的数据写入文件
                        if (err) {
                            return -1;
                        } else {
                            return 0;
                        }
                    })
                } else {
                    return -1;
                }
            } else {
                if (data !== "") {
                    const jsonData = JSON.parse(data);//文件存在，解析已有数据
                    jsonData.userIds = jsonData.userIds || [];
                    jsonData.songIds = jsonData.songIds || []; 
                    jsonData.userIds.push(userId);
                    jsonData.songIds.push(songId); //Add new song
                    const updatedData = JSON.stringify({ // 将更新的数据字符串化
                        userIds: jsonData.userIds,
                        songIds: jsonData.songIds  
                    });
                    // 将更新的数据写入文件
                    fs.writeFile(songFilePath, updatedData, (err) => {
                        if (err) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                } else {
                    const songsData = {
                        userIds: [userId],
                        songIds: [songId]
                    }; // 添加歌曲到空数组
                    fs.writeFile(songFilePath, JSON.stringify(songsData), (err) => {// 将更新后的数据写入文件
                        if (err) {
                            return -1;
                        } else {
                            return 0;
                        }
                    })
                }
            }
        });
    },
    query: function () { //返回 歌曲id 及 点歌用户名
        return new Promise((resolve, reject) => {
            fs.readFile(songFilePath, 'utf8', (err, songsData) => {
                if (err) {
                    console.error('Error reading songId:', err);
                    reject(-1);
                } else {
                    if (songsData != "") {
                        const { userIds, songIds } = JSON.parse(songsData);
                        const promises = songIds.map((songId, index) => {
                            const userId = userIds[index];
                            return userList.query(userId)
                                .then(user => {
                                    return {
                                        songId: songId,
                                        voteBy: user.name
                                    };
                                })
                                .catch(error => {
                                    if (error == -1){
                                        return {
                                            songId: songId,
                                            voteBy: null
                                        };
                                    }
                                });
                        });
    
                        Promise.all(promises)
                            .then(results => {
                                resolve(results);
                            })
                            .catch(error => {
                                console.error('Error processing songIds:', error);
                                reject(0);
                            });
                    } else {
                        console.error('Error reading songId');
                        reject(0);
                    }
                }
            });
        });
    },
    popMusic: function (index = -1) {
        return new Promise((resolve, reject) => {
            fs.readFile(songFilePath, 'utf8', (err, songsData) => {
                if (err) {
                    console.error('Error reading songId:', err);
                    reject({ message: 'Error reading songId' });
                } else {
                    const { userIds, songIds } = JSON.parse(songsData);
                    if (songIds.length === 0) {
                        reject({ message: 'No songId to delete' });
                    } else if (index === -1){ 
                        const popSongId = songIds.shift();
                        const popUserId = userIds.shift();
                        fs.writeFile(songFilePath, JSON.stringify({ userIds, songIds }), (err) => {
                            if (err) {
                                console.error('Error writing songId:', err);
                                reject({ message: 'Error writing songId' });
                            } else {
                                resolve({
                                    message: 'Song deleted successfully',
                                    songId: popSongId,
                                    userId: popUserId
                                });
                            }
                        });
                    } else {
                        // Remove the songId from the list
                        // 指定删除的index号
                        songIds.splice(index, 1);
                        userIds.splice(index, 1);

                        // Write the updated data back to the file
                        fs.writeFile(songFilePath, JSON.stringify({ userIds, songIds }), (err) => {
                            if (err) {
                                console.error('Error writing songsData:', err);
                                reject({ message: 'Error writing songsData' });
                            } else {
                                resolve({ message: 'Song deleted successfully' });
                            }
                        });
                    
                    }
                }
            });
        });
    }
}

module.exports = songList;