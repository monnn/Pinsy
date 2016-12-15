var Pin = require('mongoose').model('Pin'),
    User = require('mongoose').model('User'),
    Comment = require('mongoose').model('Comment'),
    Like = require('mongoose').model('Like'),
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
        var userId = req.query.userId;
        if (userId) {
            Pin.find({'creator._id': userId}).exec(function (err, collection) {
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

    likePin: function(req, res) {
        var hasLiked = req.body.hasLiked,
            like = {pin: req.body.pin, user: req.body.user, date: req.body.date};

        if (hasLiked) {
            Like.findOneAndRemove({pin: like.pin, user: like.user}, function (err, like) {
                if (err) {
                    console.log('Failed to create new like ' + err);
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                res.send(like);
            });
        } else {
            Like.create(like, function (err, like) {
                if (err) {
                    console.log('Failed to create new like ' + err);
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                res.send(like);
            });
        }
    },

    getLikes: function(req, res) {
        var pinId = req.query.pinId;
        Like.find({pin: pinId}).exec(function (err, collection) {
            if (err) {
                console.log('Like could not be loaded ' + err);
            }
            res.send(collection);
        });
    },

    commentPin: function(req, res) {
        var comment = {pin: req.body.pin, user: req.body.user, content: req.body.comment, date: req.body.date};

        Comment.create(comment, function (err, comment) {
            if (err) {
                console.log('Failed to create new comment ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.send(comment);
        });
    },

    getComments: function(req, res) {
        var pinId = req.query.pinId,
            userId = req.query.userId;
        if (pinId) {
            Comment.find({pin: pinId}).exec(function (err, collection) {
                if (err) {
                    console.log('Comment could not be loaded ' + err);
                }
                res.send(collection.reverse());
            });
        } else if (userId) {
            Comment.find({user: userId}).exec(function (err, collection) {
                if (err) {
                    console.log('Comment could not be loaded ' + err);
                }
                res.send(collection.reverse());
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
