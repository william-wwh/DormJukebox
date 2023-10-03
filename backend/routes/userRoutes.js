const express = require('express');
const router = express.Router();

// 导入控制器模块
const {app,query} = require('../controllers/userController');

// 定义路由
router.post('/add', app);
router.post('/query', query);
module.exports = router;
