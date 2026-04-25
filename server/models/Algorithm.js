const mongoose = require('mongoose');

const algorithmSchema = new mongoose.Schema({
  name:         { type: String, required: true },      // "Bubble Sort"
  category:     { type: String, required: true },      // "Sorting"
  difficulty:   { type: String, enum: ['Easy','Medium','Hard'] },
  description:  { type: String, required: true },
  timeComplex:  String,                                // "O(n²)"
  spaceComplex: String,                               // "O(1)"
  visualizerUrl:String,                               // external link
  tags:         [String],
}, { timestamps: true });

module.exports = mongoose.model('Algorithm', algorithmSchema);
