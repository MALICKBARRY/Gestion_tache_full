
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  priorite: { 
    type: String, 
    enum: ['faible', 'moyenne', 'élevée'], 
    default: 'moyenne' 
  },
  status: { 
    type: String, 
    enum: ['en cours', 'terminée'], 
    default: 'en cours' 
  },
  assigneA: {type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: false},
  creePar: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  dateEch: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
