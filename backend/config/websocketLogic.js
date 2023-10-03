const WebSocket = require('ws');
// 导入获取时间的接口
const music = require('../services/songService');
const { getSearchSuggest } = require('../models/search')
//导入songId
const shared = require('../public/public');
//客户端列表
let connectedClients = [];

module.exports = {
    addClient: (ws) => {
        // console.log("connectedClientsADDBefor", connectedClients)
        connectedClients.push(ws);
        // console.log("connectedClientsADDAfter", connectedClients)
    },
    removeClient: (ws) => {
        console.log('A client disconnected');
        // 移除断开连接的客户端
        const index = connectedClients.indexOf(ws);
        if (index !== -1) {
            connectedClients.splice(index, 1);
        }
    },
    sendToAllClients: (message) => {
        // console.log("connectedClients", connectedClients)
        connectedClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    },
    receiveMessage: async (ws, message) => {
        const data = JSON.parse(message);
        if (data.action === 'getCurrentTime') {//现在播放的时长
            try {
                const currentTime = await music.currentTime();
                ws.send(JSON.stringify({ action: 'currentTime', currentTime: currentTime }));
            } catch (error) {
                console.error(error);
            }
        } else if (data.action === 'getDurationTime') {//总时长
            try {
                const durationTime = await music.durationTime();
                ws.send(JSON.stringify({ action: 'durationTime', durationTime: durationTime }));
            } catch (error) {
                console.error(error);
            }
        } else if (data.action === 'getSearchSuggest') {
            const keywords = data.keywords;
            const result = await getSearchSuggest(keywords);
            // console.log(result)
            ws.send(JSON.stringify({ action: 'searchSuggest', result: result }));
        } else if (data.action === 'getMusicID') {
            const songId = shared.songId
            console.log("getMusicID",songId)
            ws.send(JSON.stringify({ action: 'switchMusic', songId: songId }));
        } else if (data.action === 'setProgress') { //百分比
            const progress = data.progress
            console.log("progress",progress)
            music.setProgress(progress);
        } else if (data.action === 'setVolume') {
            const volume = data.volume
            console.log("volume", volume)
            module.exports.sendToAllClients(JSON.stringify({ action: 'setVolume', volume: volume }));
            music.setVolume(volume);
        } else if (data.action === 'playStatus') {
            try {
                const playStatus = await music.playStatus()
                ws.send(JSON.stringify({ action: 'playStatus', playStatus: playStatus}))
            } catch (error) {
                console.error(error);
            }
            
        } else if (data.action === 'getPlayList') {
            try {
                let playList = await music.getPlayList();
                ws.send(JSON.stringify({ action: 'updatePlayList', playList: playList}))
            } catch (error) {
                console.error(error);
            }
        }
    }
};