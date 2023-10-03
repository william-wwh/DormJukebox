const songList = require('../models/songList')
const music = require('../services/songService')
const websocketLogic = require('../config/websocketLogic');
const {vlc} = require('../config/vlcConfig');
const shared = require('../public/public');

let lastAddedTimestamp = 0
let lastAddedUserId = null

const addMusicOnly = async (songId,userId) => {
    userId = userId || null;
    const addCurrentTime = Date.now(); //添加歌曲时间
    // 检查是否在短时间内重复添加歌曲
    if (userId === lastAddedUserId && addCurrentTime - lastAddedTimestamp < 5000) {
        return 0;
    }
    if (await vlc.isPlaying() || await vlc.isPaused()) {
        //添加到列表
        songList.append(songId, userId);
        lastAddedTimestamp = addCurrentTime;
        lastAddedUserId = userId;
        return 2;
    } else {
        // 如果没有正在播放或暂停中的歌曲，则直接播放
        shared.songId = songId
        music.switchMusic(songId);
        console.log("addMusic")
        websocketLogic.sendToAllClients(JSON.stringify({ action: 'musicPlayed' }));
        websocketLogic.sendToAllClients(JSON.stringify({ action: 'switchMusic', songId: songId }));
        return 1;
    }
    
    
};

const nextMusicOnly = async () => {
    try {
        const result = await songList.query();
        if (result) {
            try {
                const popResult = await songList.popMusic();
                console.log("popResult",popResult)
                const { songId, userId } = popResult;
                shared.songId = songId
                console.log("songId", songId)
                await music.switchMusic(songId);
                console.log("switchMusic")
                // 发送消息给所有客户端
                websocketLogic.sendToAllClients(JSON.stringify({ action: 'switchMusic', songId: songId }));
                return { songId: songId, userId: userId };
            } catch (popError) {
                if (popError.message === 'No songId to delete') {
                    // Do nothing, just return default values
                    return { songId: -1, userId: -1 };
                } else {
                    throw popError; // Re-throw other errors
                }
            }
        } else {
            return Promise.resolve({ songId: -1, userId: -1 });
        }
    } catch (error) {
        console.error(error);
        return { songId: -1, userId: -1 };
    }
};
module.exports = {
    addMusicOnly,
    nextMusicOnly
};