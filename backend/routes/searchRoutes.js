const express = require('express');
const router = express.Router();

// 导入控制器模块
const {search} = require('../controllers/searchController');

// 定义路由
router.get('/', search);
module.exports = router;
