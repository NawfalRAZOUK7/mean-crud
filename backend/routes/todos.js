const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Create a todo
router.post('/', auth, async (req, res) => {
  const todo = new Todo({
    ...req.body,
    userId: req.user._id
  });
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all todos
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a todo by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user._id });
    if (!todo) return res.status(404).send();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a todo
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).send();
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!todo) return res.status(404).send();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
