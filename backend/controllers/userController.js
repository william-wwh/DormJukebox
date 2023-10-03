const { app, query } = require('../services/userService')

exports.app = async (req, res) => {
    try {
        userName = req.body.userName
        app(userName)
            .then(request => {
                res.json(request);
            })
            .catch(err => {
                return err
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  
exports.query = (req, res) => {
    try {
        userId = req.body.userId
        query(userId)
            .then(request => {
                res.json(request);
            })
            .catch(err => {
                return err
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  