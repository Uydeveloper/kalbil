const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String, // pdf, docx, pptx
});

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  public_id: String,
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  materials: [materialSchema],
  videos: [videoSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);