const { vlc } = require('../config/vlcConfig')
const { nextMusicOnly } = require('../models/nextMusic'); // 导入 nextMusic 方法
const shared = require('../public/public');

const nextMusic = () => {
    vlc.isStopped()
    .then(res => {
        if (res && !shared.isDownloading) { // 检查VLC是否已停止，下载是否完成
            nextMusicOnly();
        }
    });
}
const startTimer = () => {
    setInterval(() => {
        if (vlc.isStopped()) {
            nextMusic();
        }
    }, 1000); // 每秒检查一次
}
module.exports = { startTimer }; // 导出需要在其他地方使用的函数