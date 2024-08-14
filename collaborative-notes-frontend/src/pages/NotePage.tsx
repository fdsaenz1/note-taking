import React from 'react';
import NoteEditor from '../components/NoteEditor';

const NotesPage: React.FC = () => {
    return (
        <div>
            <h1>Your Notes</h1>
            <NoteEditor />
        </div>
    );
};

export default NotesPage;
