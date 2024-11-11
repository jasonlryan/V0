import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Document } from '../../types';

interface DocumentFolder {
  id: string;
  name: string;
  documents: string[];
}

interface DocumentTag {
  id: string;
  name: string;
  color: string;
}

interface DocumentsState {
  documents: Document[];
  folders: DocumentFolder[];
  tags: DocumentTag[];
  loading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  documents: [],
  folders: [],
  tags: [],
  loading: false,
  error: null
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    setFolders: (state, action: PayloadAction<DocumentFolder[]>) => {
      state.folders = action.payload;
    },
    setTags: (state, action: PayloadAction<DocumentTag[]>) => {
      state.tags = action.payload;
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setDocuments, 
  setFolders,
  setTags,
  addDocument, 
  removeDocument, 
  setLoading, 
  setError 
} = documentsSlice.actions;

export const documentsReducer = documentsSlice.reducer;