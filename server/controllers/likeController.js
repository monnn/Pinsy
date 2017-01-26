var Pin = require('mongoose').model('Pin'),
    User = require('mongoose').model('User'),
    Like = require('mongoose').model('Like'),
    config = require('../config/config');

module.exports = {
    likePin: function(req, res) {
        var hasLiked = req.body.hasLiked,
            like = {pin: req.body.pin, user: req.body.user, date: req.body.date};

        if (hasLiked) {
            Like.findOneAndRemove({pin: like.pin, user: like.user}, function (err, like) {
                if (err) {
                    console.log('Failed to remove like ' + err);
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                console.log("removing like");
                res.send(like);
            });
        } else {
            Like.create(like, function (err, like) {
                if (err) {
                    console.log('Failed to create new like ' + err);
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                console.log("adding like");
                res.send(like);
            });
        }
    },

    getLikes: function(req, res) {
        var pinId = req.query.pinId,
            date = req.query.date;
            console.log(req.query);
        if (pinId) {
            Like.find({pin: pinId}).exec(function (err, collection) {
                if (err) {
                    console.log('Like could not be loaded ' + err);
                }
                res.send(collection);
            });
        } else if (date) {
            Like.find({date: { "$gte" : new Date(date) }}).exec(function (err, collection) {
                if (err) {
                    console.log('Like could not be loaded ' + err);
                }
                console.log(collection);
                res.send(collection);
            });
        }
    }
}