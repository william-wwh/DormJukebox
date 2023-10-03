const express = require('express');
const router = express.Router();

// 导入控制器模块
const exampleController = require('../controllers/exampleController');

// 定义路由
router.get('/example', exampleController.getExampleData);
router.post('/example', exampleController.createExampleData);

module.exports = router;
