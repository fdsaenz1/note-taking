import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NoteEditorProps {
  noteId?: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteId) {
      // Fetch existing note data if noteId is provided
      const fetchNote = async () => {
        const response = await axios.get(`http://localhost:5000/api/notes/${noteId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      };
      fetchNote();
    }
  }, [noteId]);

  const handleSave = async () => {
    if (noteId) {
      // Update existing note
      await axios.put(`http://localhost:5000/api/notes/${noteId}`, { title, content });
    } else {
      // Create new note
      await axios.post('http://localhost:5000/api/notes', { title, content });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border rounded mb-2"
        rows={10}
      />
      <button onClick={handleSave} className="w-full p-2 bg-blue-500 text-white rounded">Save</button>
    </div>
  );
};

export default NoteEditor;
