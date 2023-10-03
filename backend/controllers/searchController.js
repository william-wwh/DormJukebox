const {cloudsearch} = require('../NeteaseCloudMusicApi/main')
exports.search = async (req, res) => {
    // console.log(req.query.ids);
    keywords = req.query.keywords
    const result = await cloudsearch({
        keywords: keywords
    })
    res.json(result);
};