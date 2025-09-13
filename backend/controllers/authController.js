const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Inscription
exports.register = async (req, res, next) => {
  try {
    const { nom, email, password, role } = req.body;
    const user = await User.create({ nom, email, password, role });
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (err) {
    next(err);
  }
};

// Connexion
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};
