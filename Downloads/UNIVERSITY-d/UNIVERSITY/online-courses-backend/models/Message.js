const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
toCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
text: String,
}, { timestamps: true });


module.exports = mongoose.model('Message', messageSchema);