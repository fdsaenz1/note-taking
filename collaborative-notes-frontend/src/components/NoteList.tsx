// src/components/NoteList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, selectNotes, selectNotesStatus } from '../store/noteSlice';
import { AppDispatch, RootState } from '../store';

const NoteList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => selectNotes(state));
  const status = useSelector((state: RootState) => selectNotesStatus(state));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getNotes());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching notes.</div>;
  }

  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        <ul>
          {notes.map((note: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; createdAt: string | number | Date; updatedAt: string | number | Date; }) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>Created at: {new Date(note.createdAt).toLocaleString()}</small>
              <small>Updated at: {new Date(note.updatedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
