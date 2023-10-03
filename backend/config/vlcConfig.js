const VLC = require('vlc-client')
exports.vlc = new VLC.Client({
    ip: "localhost",
    port: 8080,
    password: "123456" //修改密码
});