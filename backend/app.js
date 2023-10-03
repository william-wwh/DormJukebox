const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

// // 指定允许的源，例如你的前端地址
// const allowedOrigins = ['http://192.168.1.104:8081'];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true // 允许携带凭据
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// exec('vlc --no-qt-privacy-ask --intf dummy'); // 启动VLC播放器实例 /--no-qt-privacy-ask --intf dummy
const vlcProcess = spawn('vlc', ['--no-qt-privacy-ask', '--intf', 'dummy']); // 启动VLC播放器实例

// 监听程序退出事件
process.on('exit', () => {
  // 在程序退出时终止VLC进程
  vlcProcess.kill();
});

// 监听CTRL+C事件，例如在命令行按下CTRL+C
process.on('SIGINT', () => {
  // 在接收到CTRL+C时终止VLC进程
  vlcProcess.kill();
  process.exit();
});

// 导入路由模块并使用
const songRoutes = require('./routes/songRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use('/song', songRoutes);
app.use('/user', userRoutes);
app.use('/cloudsearch', searchRoutes);

//websocket
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app); // 使用 Express 应用作为 HTTP 服务器
const websocketLogic = require('./config/websocketLogic');

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    console.log('A client connected');
    websocketLogic.addClient(ws);

    // 监听客户端发送的消息
    ws.on('message', (message) => {
        websocketLogic.receiveMessage(ws,message);
    });

    ws.on('close', () => {
        console.log('A client disconnected');
        websocketLogic.removeClient(ws);
    });
});

const {startTimer} = require('./tasks/autoNext')//自动
startTimer();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});