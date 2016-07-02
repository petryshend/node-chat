var mongoose = require('mongoose');

module.exports = mongoose.model('ChatMessage', {
    message: String
});