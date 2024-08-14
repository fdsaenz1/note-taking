// controllers/noteController.js
const Note = require('../models/Note');

// Create Note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      createdBy: req.user.id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(id, { title, content, updatedAt: new Date() }, { new: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
