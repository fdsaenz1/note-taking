// src/components/SharedNotes.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getNotes, selectNotes, selectNotesStatus, selectNotesError } from '../store/noteSlice';

const SharedNotes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => selectNotes(state));
  const status = useSelector((state: RootState) => selectNotesStatus(state));
  const error = useSelector((state: RootState) => selectNotesError(state));

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="shared-notes">
      <h2>Shared Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedNotes;
