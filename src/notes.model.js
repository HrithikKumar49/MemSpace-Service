const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: String,
    text: String
});

module.exports = mongoose.model('notes',notesSchema);