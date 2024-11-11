# My Notes Implementation Tasks

## 1. Core Note Saving (Free Users)

- [ ] Add "Save" button to AI chat responses
- [ ] Create SaveNoteModal component
- [ ] Implement note limit tracking (5 notes)
- [ ] Add upgrade prompt when limit reached
- [ ] Basic note list view

## 2. Notes Redux Setup

- [ ] Create NotesSlice
  - [ ] Define state structure
  - [ ] Add actions for CRUD operations
  - [ ] Implement note limit logic
- [ ] Add mock API endpoints in api.ts
  - [ ] saveNote
  - [ ] listNotes
  - [ ] deleteNote

## 3. Notes UI Components

- [ ] Create NotesLibrary component
  - [ ] Basic list view
  - [ ] White background styling
  - [ ] "Note: [Summary]" format
- [ ] Implement note actions
  - [ ] Delete
  - [ ] Edit title
  - [ ] Basic search

## 4. Pro Features - Organization

- [ ] Implement folder system
  - [ ] Create folder structure
  - [ ] Move notes between folders
  - [ ] Folder CRUD operations
- [ ] Add tag system
  - [ ] Initial taxonomy implementation
  - [ ] Tag selection UI
  - [ ] Tag filtering

## 5. Pro Features - Insights

- [ ] Create mock insight generation
  - [ ] Document analysis simulation
  - [ ] Insight formatting
  - [ ] Document linking
- [ ] Implement insights UI
  - [ ] Pale blue styling
  - [ ] "Insight: [Title]" format
  - [ ] Related documents display

## 6. Access Control

- [ ] Update ProtectedRoute for notes
- [ ] Implement feature flags
- [ ] Add upgrade prompts
- [ ] Test all user levels

Would you like me to start with any particular task?
