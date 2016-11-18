var Pin = require('mongoose').model('Pin'),
    User = require('mongoose').model('User'),
    Comment = require('mongoose').model('Comment'),
    Like = require('mongoose').model('Like'),
    fs = require('fs'),
    config = require('../config/config');

module.exports = {
    createPin: function (req, res, next) {
        var newPinData = req.body;
        // newPinData.creator = newPinData.creator._id

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
            console.log(pin);
            res.send(pin);
        });
    },

    getAllPins: function (req, res) {
        Pin.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Pin could not be loaded ' + err);
            }
            res.send(collection);
        });
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
            console.log(collection);
            res.send(collection);
        });
    },

    commentPin: function(req, res) {
        var newComment = req.body,
            commentQuery = {'$push': {comments: comment._id}};

        Comment.create(newComment, function (err, comment) {
            if (err) {
                console.log('Failed to create new comment ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }

            User.update({_id: comment.creator}, commentQuery, function(err) {
                if (err) {
                    console.log('Failed to update user ' + err);
                }
                console.log(comment.creator);
            });

            Pin.findOneAndUpdate({_id: comment.pin}, commentQuery, {new: true}, function(err, pin) {
                if (err) {
                    console.log('Failed to update pin ' + err);
                }
                console.log(pin);
                res.send(pin);
            });
        });
    },

    getComments: function(req, res) {
        var pin = req.body.pin;
        Comment.find({pin: pin._id}).exec(function (err, collection) {
            if (err) {
                console.log('Comment could not be loaded ' + err);
            }
            res.send(collection);
        });
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
