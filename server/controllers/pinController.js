var Pin = require('mongoose').model('Pin'),
    User = require('mongoose').model('User'),
    Comment = require('mongoose').model('Comment'),
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
                console.log(pin.creator);
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
        var pin = req.body.pin,
            currentUser = req.body.user,
            hasLiked = req.body.hasLiked,
            pinQuery = hasLiked ? {'$pull': {likes: currentUser._id}} : {'$addToSet': {likes: currentUser._id}},
            userQuery = hasLiked ? {'$pull': {likes: pin._id}} : {'$addToSet': {likes: pin._id}};

        User.update({_id: currentUser._id}, userQuery , function(err) {
            if (err) {
                console.log('Failed to update user ' + err);
            }
        });

        Pin.findOneAndUpdate({_id: pin._id}, pinQuery, {new: true}, function(err, pin) {
            if (err) {
                console.log('Failed to update pin ' + err);
            }
            res.send(pin);
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

    getAllComments: function(req, res) {
        Comment.find({}).exec(function (err, collection) {
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
