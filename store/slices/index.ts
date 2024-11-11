export { authReducer } from './authSlice';
export { documentsReducer } from './documentsSlice';
export { notesReducer } from './notesSlice';
export { insightsReducer } from './insightsSlice';

export { 
  setUser, 
  clearUser, 
  setError as setAuthError 
} from './authSlice';

export {
  setDocuments,
  setFolders,
  setTags,
  addDocument,
  removeDocument,
  setLoading as setDocumentsLoading,
  setError as setDocumentsError
} from './documentsSlice';

export {
  setNotes,
  addNote,
  removeNote,
  setLoading as setNotesLoading,
  setError as setNotesError
} from './notesSlice';

export {
  setInsights,
  addInsight,
  removeInsight,
  setLoading as setInsightsLoading,
  setError as setInsightsError
} from './insightsSlice';