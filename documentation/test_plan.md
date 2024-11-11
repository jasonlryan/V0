# HomeTruth Test Plan

## 1. Authentication Tests

### User Login Flow

- [ ] Test login with valid credentials
- [ ] Verify error handling for invalid credentials
- [ ] Check token storage in localStorage
- [ ] Verify protected route redirection
- [ ] Test logout functionality

## 2. Document Management Tests

### Upload Functionality

- [ ] Test drag-and-drop upload
- [ ] Verify file type validation
- [ ] Check upload progress indicator
- [ ] Verify successful upload notification

### Document Library

- [ ] Verify automatic view switching (simple/advanced) at 10 documents
- [ ] Test list/grid view toggle in advanced mode
- [ ] Verify document sorting functionality
- [ ] Test document deletion
- [ ] Check file size formatting

## 3. Chat & Notes Tests

### Basic Chat Functionality

- [ ] Test sending messages
- [ ] Verify test response generation
- [ ] Check message display formatting
- [ ] Test input field validation

### Save Note Flow

- [ ] Test "Save as Note" button visibility on AI responses
- [ ] Verify note modal opens correctly
- [ ] Test tag selection/deselection
- [ ] Verify title editing
- [ ] Check note appears in InsightsList
- [ ] Verify white background for notes

## 4. Insights Management Tests

### Display and Filtering

- [ ] Verify correct color coding (white for notes, blue for insights)
- [ ] Test tag filtering functionality
- [ ] Check related documents links
- [ ] Verify insight deletion

### Integration Tests

- [ ] Verify saved notes appear in insights list
- [ ] Test tag filtering across notes and insights
- [ ] Check related document links work correctly
- [ ] Verify proper error handling

## 5. UI/UX Tests

### Responsive Design

- [ ] Test layout on desktop
- [ ] Test layout on tablet
- [ ] Test layout on mobile
- [ ] Verify component spacing and alignment

### Loading States

- [ ] Verify loading indicators during document upload
- [ ] Check loading states in insights list
- [ ] Test loading states in document library

### Error Handling

- [ ] Test error messages for failed uploads
- [ ] Verify error states in insights list
- [ ] Check error handling in chat interface

## Test Environment Setup

1. Start with empty state (no documents/insights)
2. Add test documents (less than 10)
3. Add more documents to test view switching
4. Create test notes through chat
5. Verify all integrations

## Success Criteria

- All checkboxes marked
- No console errors
- Smooth user experience
- Proper error handling
- Consistent styling
