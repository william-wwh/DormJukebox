const express = require('express');
const router = express.Router();

// 导入控制器模块
const {idGetDetail,musicCtrl} = require('../controllers/songController');


// 定义路由
router.get('/detail', idGetDetail);
router.post('/addMusic', musicCtrl.addMusic);
router.post('/nextMusic', musicCtrl.nextMusic);
// router.get('/currentTime', musicCtrl.currentTime);
// router.get('/durationTime', musicCtrl.durationTime);
router.post('/playMusic', musicCtrl.playMusic);
router.post('/stopMusic', musicCtrl.stopMusic);
router.post('/deleteMusic', musicCtrl.deleteMusic);
module.exports = router;
