var mongoose = require('mongoose');

module.exports = mongoose.model('ChatMessage', {
    message: String,
    dateTime: {
        type: Date,
        default: Date.now
    }
});