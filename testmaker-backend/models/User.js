const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    queries_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Query'
    }],
});

module.exports = mongoose.model('User', userSchema);