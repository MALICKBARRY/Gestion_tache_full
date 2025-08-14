const Member = require('../models/Member');
const User = require('../models/User');
const Tache = require('../models/Tache');
const taskSchema = require('../validations/tachesValidation');


// Créer une tâche
exports.createTache = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body, { allowUnknown: true });
if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = req.user.id;

    let tacheData = { ...req.body, creePar: userId };

    // Exemple : assigner automatiquement un membre avec rôle 'chef'
    if(!tacheData.assigneA){
 const chef = await Member.findOne({ role: 'chef', creePar: userId});
 if(!chef){
  return res.status(404).json({message: "Aucun chef trouvé pour cet utilisateur"});
 }
tacheData.assigneA = chef._id;
    // if (chef) {
      
    // }
   
    }

    let tache = await Tache.create(tacheData);
    tache = await Tache.findById(tache._id)
      .populate('assigneA', 'nom email')
      .populate('creePar', 'nom email role');

    res.status(201).json(tache);

  } catch (err) {
    next(err);
  }
};


// Obtenir toutes les tâches (avec pagination et filtre)
exports.getTache = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, priorite, status } = req.query;
    const filter = {};
    if (priorite) filter.priorite = priorite;
    if (status) filter.status = status;

    const tache = await Tache.find(filter)
      .populate('assigneA', 'nom email')
      .populate('creePar', 'nom email role')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Tache.countDocuments(filter);

    res.json({ total, page, tache });
  } catch (err) {
    next(err);
  }
};

// Modifier une tâche
exports.updateTache = async (req, res, next) => {
  try {
    const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assigneA', 'nom email')
      .populate('creePar', 'nom email role');
    res.json(tache);
  } catch (err) {
    next(err);
  }
};

// Supprimer une tâche
exports.deleteTache = async (req, res, next) => {
  try {
    await Tache.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    next(err);
  }
};
