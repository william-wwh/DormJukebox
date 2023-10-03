exports.getExampleData = (req, res) => {
    // 从数据库或其他数据源获取数据
    const data = { message: 'Hello from the server!' };
    res.json(data);
};
  
exports.createExampleData = (req, res) => {
    // 处理从前端发送的数据并进行相应的操作
    res.json({ message: 'Data received and processed.' });
};
  