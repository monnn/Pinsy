var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user ' + err);
                return;
            }
            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                res.send(user);
            });
        });
    },
    getUsers: function (req, res) {
        var userId = req.query.uId;
        if (userId) {
            User.find({_id: userId}).exec(function (err, user) {
            if (err) {
                console.log('User could not be loaded ' + err);
            }
            console.log(user);
            res.send(user);
        });
        } else {
            User.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('User could not be loaded ' + err);
                }
                res.send(collection);
            });
        }
    }
}
