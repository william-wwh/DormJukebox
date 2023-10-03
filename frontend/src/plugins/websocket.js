export const socket = new WebSocket('ws://192.168.1.108:3000');//建立连接

socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});