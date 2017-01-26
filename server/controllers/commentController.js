var Pin = require('mongoose').model('Pin'),
    User = require('mongoose').model('User'),
    Comment = require('mongoose').model('Comment'),
    config = require('../config/config');

module.exports = {
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
        } else {
            Comment.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Comment could not be loaded ' + err);
                }
                res.send(collection.reverse());
            });
        }
    }
}