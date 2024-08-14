// src/components/NoteEditor.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { createNote, updateNote, selectNotesStatus, selectNotesError } from '../store/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';

interface NoteEditorProps {
  initialNote?: {
    id?: string;
    title: string;
    content: string;
  };
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialNote }) => {
  const [title, setTitle] = useState<string>(initialNote?.title || '');
  const [content, setContent] = useState<string>(initialNote?.content || '');
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => selectNotesStatus(state));
  const error = useSelector((state: RootState) => selectNotesError(state));
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Updated from useHistory

  useEffect(() => {
    if (id && !initialNote) {
      // Fetch note if id is present and initialNote is not provided
      // Implement fetch logic here if needed
    }
  }, [id, initialNote]);

  const handleSave = () => {
    if (initialNote) {
      dispatch(updateNote({
        id: initialNote.id!,
        title,
        content,
        createdAt: '',
        updatedAt: ''
      }));
    } else {
      dispatch(createNote({
        title,
        content,
      }));
    }
    navigate('/'); // Redirect after saving
  };

  if (status === 'loading') return <p>Saving...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="note-editor">
      <h2>{initialNote ? 'Edit Note' : 'New Note'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteEditor;
