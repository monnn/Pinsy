var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var likeSchema = Schema({
    pin: { type: Schema.Types.ObjectId, ref: 'Pin' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date
});

var Like = mongoose.model('Like', likeSchema);
