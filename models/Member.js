const { required } = require('joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  role: { type: String, enum: ['membre', 'chef'], default: 'membre' },
  creePar: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
