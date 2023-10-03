const { song_url } = require('../NeteaseCloudMusicApi/main')
const { vlc } = require('../config/vlcConfig')
const songList = require('../models/songList')
const fs = require('fs');
const { Readable } = require('stream');
const shared = require('../public/public');

// const outputFilePath = 'output.mp3'; // The name of the file to save the downloaded MP3
// const outputStream = fs.createWriteStream(outputFilePath);

const music = {
    // 添加歌曲
    addMusic: async (songId, userId) => {
        userId = userId || null;
        const addCurrentTime = Date.now(); //添加歌曲时间
        // 检查是否在短时间内重复添加歌曲
        if (userId === this.lastAddedUserId && addCurrentTime - this.lastAddedTimestamp < 5000) {
            return 0;
        }
        if (await vlc.isPlaying() || await vlc.isPaused()) {
            //添加到列表
            songList.append(songId, userId);
            this.lastAddedTimestamp = addCurrentTime;
            this.lastAddedUserId = userId;
            return 2;
        } else {
            // 如果没有正在播放或暂停中的歌曲，则直接播放
            music.switchMusic(songId);
            return 1;
        }
    },
    //播放音乐 给id直接切换
    switchMusic: async (id) => {
        try {
            const request = await song_url({ id: id })
            const musicUrl = request.body.data[0].url
            // 创建临时文件夹
            const tempDir = 'temp';
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
            await vlc.stop();
            // 清空temp文件夹
            fs.readdirSync(tempDir).forEach((file) => {
                const filePath = `${tempDir}/${file}`;
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            });
            //下载歌曲
            const fileName = `${tempDir}/${musicUrl.split('/').pop()}`;
            shared.isDownloading = true;
            const response = await fetch(musicUrl);
            if (!response.ok) {
                throw new Error('Failed to download the music file.');
            }
            // 下载音频文件到临时文件夹
            const blob = await response.blob();
            const fileStream = fs.createWriteStream(fileName);
            const blobStream = Readable.from([Buffer.from(await blob.arrayBuffer())]);
            blobStream.pipe(fileStream);
            await new Promise((resolve) => {
                fileStream.on('close', resolve);
            });
            await vlc.playFile(fileName);
            shared.isDownloading = false;
        } catch (error) {
            console.error('Error switching music:', error);
        }
    },
    //查询已播放时长
    currentTime: async () => {
        time = await vlc.getTime();
        return time
    },
    //查询总时长
    durationTime: async () => {
        time = await vlc.getLength();
        return time
    },
    //开始播放
    playMusic: () => {
        vlc.play();
    },
    stopMusic: () => {
        vlc.pause();
    },
    playStatus: async () => {
        playStatus = await vlc.status();
        return playStatus.state;
    },
    setProgress: (currentTime) => {
        vlc.setProgress(currentTime)
    },
    setVolume: (volume) => {
        vlc.setVolume(volume)
    },
    getPlayList: async () => {
        const playList = await songList.query();
        return playList;
    },
    deleteMusic: async (idx) => {
        try {
            const result = await songList.popMusic(idx);
            return result;
        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = music;