var Pin = require('mongoose').model('Pin'),
    User = require('mongoose').model('User'),
    fs = require('fs'),
    config = require('../config/config');

module.exports = {
    createPin: function (req, res, next) {
        var newPinData = req.body;
        Pin.create(newPinData, function (err, pin) {
            if (err) {
                console.log('Failed to create new pin ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }
            User.update({_id: newPinData.creator._id}, {'$push': {pins: pin._id}}, function(err) {
                if (err) {
                    console.log('Failed to update user ' + err);
                }
            });
            res.send(pin);
        });
    },

    getPins: function (req, res) {
        var userId = req.query.userId,
            pinId = req.query.pinId,
            tag = req.query.tag;
        if (userId) {
            Pin.find({'creator._id': userId}).exec(function (err, collection) {
            if (err) {
                console.log('Pin could not be loaded ' + err);
            }
            res.send(collection);
        });
        } else if (pinId) {
            Pin.find({'_id': pinId}).exec(function (err, collection) {
            if (err) {
                console.log('Pin could not be loaded ' + err);
            }
            res.send(collection);
        });
        } else if (tag) {
            Pin.find({'tags': tag}).exec(function (err, collection) {
            if (err) {
                console.log('Pin could not be loaded ' + err);
            }
            res.send(collection);
        });
        } else {
            Pin.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Pin could not be loaded ' + err);
                }
                res.send(collection);
            });
        }
    },

    getUploadToken: function(req, res) {
        fs.readFile(config.rootPath + '/dropbox-tokens.json', 'utf8', function (err, fileContents) {
            if (err) {
                return console.log(err);
            }
            res.send(fileContents);
        });
    }
}
