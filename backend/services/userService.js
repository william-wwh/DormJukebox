const userList = require('../models/users')

exports.app = (userName) => {
        console.log("userName", userName)
        return userList.app(userName)
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            })

}

exports.query = (userId) => {
    return userList.query(userId)
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        })
}