const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  membreId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Membre',
  required: false  // au début, pour tests
}
}, { timestamps: true });

// Hashage du mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Comparer mot de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
