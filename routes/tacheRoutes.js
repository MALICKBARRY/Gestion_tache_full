const express = require('express');
const { createTache, getTache, updateTache, deleteTache } = require('../controllers/tacheController');
const auth = require('../middlewares/authMiddleware');
const tacheValid = require ('../validations/tachesValidation');

const router = express.Router();

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


router.post('/', auth, validate(tacheValid), createTache);
router.get('/', auth, getTache);
router.put('/:id', auth, validate(tacheValid), updateTache);
router.delete('/:id', auth, deleteTache);

module.exports = router;
