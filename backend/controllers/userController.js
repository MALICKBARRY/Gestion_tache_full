const User = require('../models/User');

// Lister tous les utilisateurs (admin seulement)
exports.getUsers = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé - Admin requis' });
    }
    
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Supprimer un utilisateur (admin seulement)
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé - Admin requis' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    next(err);
  }
};

// Modifier le rôle d'un utilisateur (admin seulement)
exports.updateUserRole = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé - Admin requis' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { role: req.body.role }, 
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    next(err);
  }
};