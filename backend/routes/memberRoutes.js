const express = require('express');
const { createMember, getMembers, getMemberById, updateMember, deleteMember } = require('../controllers/memberController');
const auth = require('../middlewares/authMiddleware');
const memberSchema = require('../validations/memberValidation');

const router = express.Router();

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

router.post('/', auth, validate(memberSchema), createMember);
router.get('/', auth, getMembers);
router.get('/:id', auth, getMemberById);
router.put('/:id', auth, validate(memberSchema), updateMember);
router.delete('/:id', auth, deleteMember);

module.exports = router;
