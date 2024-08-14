// routes/noteRoutes.js

const express = require('express');
const { createNote, getNotes, updateNote, deleteNote, shareNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');
const router = express.Router();

// Route to create a new note
router.post('/', auth, createNote);

// Route to get all notes for the logged-in user
router.get('/', auth, getNotes);

// Route to update a note
router.put('/:id', auth, updateNote);

// Route to delete a note
router.delete('/:id', auth, deleteNote);

// Route to share a note with another user
router.post('/:id/share', auth, shareNote);

module.exports = router;
