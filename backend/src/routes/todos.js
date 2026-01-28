const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/todos
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('todos');
    res.json(user.todos);
  } catch (err) {
    next(err);
  }
});

// POST /api/todos
router.post('/', auth, async (req, res, next) => {
  try {
    const { title } = req.body;
    const user = await User.findById(req.userId);
    user.todos.push({ title });
    await user.save();
    res.status(201).json(user.todos[user.todos.length - 1]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
