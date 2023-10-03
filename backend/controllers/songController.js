const {song_detail} = require('../NeteaseCloudMusicApi/main')
const music = require('../services/songService')
const { nextMusicOnly, addMusicOnly } = require('../models/nextMusic'); // 导入 nextMusic 方法
const websocketLogic = require('../config/websocketLogic');
// 歌曲id获取详情
exports.idGetDetail = async (req, res) => {
    // console.log(req.query.ids);
    ids = req.query.ids
    const result = await song_detail({
        ids: ids
    })
    res.json(result);
};

// 音乐控制
exports.musicCtrl = {
    // 切换音乐
    /*
    * TODO: Play music
    * @param {int} songId
    * @param {int} userId
    * @return {int} addState
    *    0: 短时间内添加多个
    *    1: 立刻播放
    *    2: 添加到队列
    */
    addMusic: async (req, res) => {
        try {
            const songId = req.body.songs;
            // shared.songId = songId
            const userId = parseInt(req.body.userId);
            const request = await addMusicOnly(songId, userId);
            if (request == 2) {
                websocketLogic.sendToAllClients(JSON.stringify({ action: 'addMusic', songId: songId, userId: userId }))
            }
            // console.log("addMusicOnly",request)
            res.json(request);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    nextMusic: async (req, res) => {
        try {
            const isAdmin = req.body.isAdmin;
            console.log("isAdmin",isAdmin)
            if (isAdmin) {
                const result = await nextMusicOnly();
                if (result.songId === -1 && result.userId === -1) {
                    // Handle the special case where no song is available
                    return res.json({ message: 'No song available' });
                }
                // Sending the response
                res.json(result);
            } else {
                res.status(500).json({ error: 'Not Admin' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },    
    currentTime: async (req, res) => { //弃用 改websocket 直接调用music.currentTime();
        try {
            const request = await music.currentTime();
            res.json(request);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    durationTime: async (req, res) => {//弃用 改websocket 直接调用music.durationTime();
        try {
            const request = await music.durationTime();
            res.json(request);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    // playMusic: (req, res) => {
    //     music.playMusic();
    // },
    // stopMusic: (req, res) => {
    //     music.stopMusic();
    // },
    playMusic: (req, res) => {
        music.playMusic();
        websocketLogic.sendToAllClients(JSON.stringify({ action: 'musicPlayed' }));
    },
    stopMusic: (req, res) => {
        music.stopMusic();
        websocketLogic.sendToAllClients(JSON.stringify({ action: 'musicStoped' }));
    },
    playStatus: async (req, res) => {
        try {
            const request = await music.playStatus();
            res.json(request);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteMusic: async (req, res) => {
        try {
            const request = await music.deleteMusic(req.body.idx);
            let idx = req.body.idx;
            console.log("index",idx);
            websocketLogic.sendToAllClients(JSON.stringify({ action: 'deleteMusic',idx:idx }));
            res.json(request);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


  