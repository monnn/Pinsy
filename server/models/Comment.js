var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentSchema = Schema({
    content: {type: String, require: '{PATH} is required'},
    pin: { type: Schema.Types.ObjectId, ref: 'Pin' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date
});

var Comment = mongoose.model('Comment', commentSchema);
