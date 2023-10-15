const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true
  },
  noteDescription: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['HIGH', 'LOW', 'MEDIUM'],
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("note", notesSchema)
