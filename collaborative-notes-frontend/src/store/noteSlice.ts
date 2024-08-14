// src/store/noteSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index'; // Adjust the import path if necessary

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesState {
  notes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  status: 'idle',
  error: null,
};

// Asynchronous thunk actions
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>, thunkAPI) => {
    // Replace with your API request
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    return (await response.json()) as Note;
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (note: Note, thunkAPI) => {
    // Replace with your API request
    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    return (await response.json()) as Note;
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, thunkAPI) => {
    // Replace with your API request
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async (_, thunkAPI) => {
    // Replace with your API request
    const response = await fetch('/api/notes');
    return (await response.json()) as Note[];
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch notes';
      })
      .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  },
});

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectNotesStatus = (state: RootState) => state.notes.status;
export const selectNotesError = (state: RootState) => state.notes.error;

export default notesSlice.reducer;
