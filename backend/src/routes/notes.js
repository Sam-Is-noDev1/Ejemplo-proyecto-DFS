const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/notes
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('notes');
    res.json(user.notes);
  } catch (err) {
    next(err);
  }
});

// POST /api/notes
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const user = await User.findById(req.userId);
    user.notes.push({ title, content });
    await user.save();
    res.status(201).json(user.notes[user.notes.length - 1]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
