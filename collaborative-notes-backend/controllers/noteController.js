// controllers/noteController.js

const Note = require('../models/Note');
const User = require('../models/User');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      owner: req.user.id,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ $or: [{ owner: req.user.id }, { sharedWith: req.user.id }] });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.owner.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.owner.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await note.remove();
    res.status(200).json({ message: 'Note removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.shareNote = async (req, res) => {
  const { userId } = req.body;
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.owner.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (note.sharedWith.includes(userId)) return res.status(400).json({ message: 'Note already shared with this user' });

    note.sharedWith.push(userId);
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
