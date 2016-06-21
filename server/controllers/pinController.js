var Pin = require('mongoose').model('Pin'),
	User = require('mongoose').model('User');

module.exports = {
	createPin: function (req, res, next) {
		var newPinData = req.body;
		Pin.create(newPinData, function (err, pin) {
			if (err) {
				console.log('Failed to create new pin ' + err);
				res.status(400);
				return res.send({reason: err.toString()});
			}
			// User.update({username: newPinData.creator.username}, {'$set': {pins: newPinData.title}}, function(err) {
			// 	if (err) {
			// 	console.log('Failed to update user ' + err);
			// }
			// 	console.log(newPinData.creator);
			// });
			res.send(pin);
		})
		
	},
	getAllPins: function (req, res) {
		Pin.find({}).exec(function (err, collection) {
			if (err) {
				console.log('Pin could not be loaded ' + err);
			}
			res.send(collection);
		})
	}
}
