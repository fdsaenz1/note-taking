// src/pages/Home.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../store/noteSlice';
import { selectNotes, selectNotesStatus, selectNotesError } from '../store/noteSlice';
import { RootState } from '../store';
import { AppDispatch } from '../store';  // Ensure this is imported

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => selectNotes(state));
  const status = useSelector((state: RootState) => selectNotesStatus(state));
  const error = useSelector((state: RootState) => selectNotesError(state));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getNotes());
    }
  }, [dispatch, status]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="home-page">
      <h1>My Notes</h1>
      {content}
      <button onClick={() => window.location.href = '/note/new'}>Create New Note</button>
      <button onClick={() => window.location.href = '/shared-notes'}>View Shared Notes</button>
    </div>
  );
};

export default Home;
