var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    content: {type: String, require: '{PATH} is required'},
    pin: Object,
    creator: Object,
    date: Date
});

var Comment = mongoose.model('Comment', commentSchema);
