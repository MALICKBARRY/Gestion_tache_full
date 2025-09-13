module.exports = (err, req, res, next) => {
  console.error(err.stack);
  // handle mongoose duplicate key error for nicer message
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} existe déjà.` });
  }
  res.status(500).json({ message: err.message || 'Erreur serveur' });
};
