const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: String,
  content: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);