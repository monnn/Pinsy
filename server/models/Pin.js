var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pinSchema = Schema({
    title: {type: String, require: '{PATH} is required'},
    description: String,
    location: Object,
    markerPosition: Array,
    image: String,
    video: String,
    creator: { type: Schema.Types.ObjectId, ref: 'Pin' },
    date: Date,
    tags: [String]
});

var Pin = mongoose.model('Pin', pinSchema);
