import React from 'react';
import NoteEditor from '../components/NoteEditor';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Collaborative Notes</h1>
            <NoteEditor />
        </div>
    );
};

export default HomePage;
