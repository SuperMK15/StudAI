const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        required: true
    },

    lecture_note_input: {
        type: String,
        required: true
    },

    test_output: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Query', querySchema);