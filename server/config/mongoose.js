var mongoose = require('mongoose'),	
	user = require('../models/User'),
	pin = require('../models/Pin');


module.exports = function(config) {
	var db = mongoose.connection;
	mongoose.connect(config.db)

	db.once('open', function(err) {
		if (err) {
			console.log('Database could not be opened ' + err);
			return;
		}
		console.log('Database up and running...')
	})

	db.on('error', function (err) {
		console.log('Database error ' + err);
	})

	user.seedInitialUsers();
};

