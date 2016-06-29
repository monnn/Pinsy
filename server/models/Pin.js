var mongoose = require('mongoose');

var pinSchema = mongoose.Schema({
		title: { type: String, require: '{PATH} is required'},
		description: String,
		location: Object,
		markerPosition: Array,
		image: String,
		video: String,
		creator: Object,
		date: Date,
		tags: String
	});

	var Pin = mongoose.model('Pin', pinSchema);
