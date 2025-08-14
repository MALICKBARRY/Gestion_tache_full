const Member = require('../models/Member');

// Créer un membre
exports.createMember = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const memberData = {...req.body, creePar: userId};
    const member = await Member.create(memberData);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

// Lister tous les membres
exports.getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    next(err);
  }
};

// Récupérer un membre par ID
exports.getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Membre introuvable' });
    res.json(member);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un membre
exports.updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (err) {
    next(err);
  }
};

// Supprimer un membre
exports.deleteMember = async (req, res, next) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    next(err);
  }
};
