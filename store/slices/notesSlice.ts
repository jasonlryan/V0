import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
  folderId?: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      // Check note limit for free users
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'free' && state.notes.length >= 5) {
        state.error = 'Free users can only save up to 5 notes';
        return;
      }
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateNote: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
      }
    }
  }
});

export const { setNotes, addNote, removeNote, updateNote, setLoading, setError } = notesSlice.actions;
export const notesReducer = notesSlice.reducer; 