# My Notes System Specification

## Overview

HomeTruth provides a note-taking system for users to save and organize AI chat responses:

- Notes are saved from AI chat responses
- White background design
- Format: "Note: [Summary Title]"

## Core Components

### 1. Save Note Feature

- Save button below each AI response
- Preview modal before saving
- Auto-generated title from content
- Access control based on user status
- Note limit tracking for free users

### 2. Notes List View

- Clean, white background design
- Title format: "Note: [Summary]"
- Content preview
- Save date display
- Actions:
  - Edit (coming soon)
  - Delete (with confirmation)

### 3. Access Control

- Unregistered: Can view AI responses, prompted to login to save
- Free Users: Up to 5 notes, basic organization
- Pro Users: Unlimited notes, advanced features

### 4. State Management

- Redux store for notes
- Note limit tracking
- Loading states
- Error handling

## Implementation Status

✅ Completed:

- Save button UI
- Preview modal
- Access control
- Free user limits
- Basic list view
- Delete functionality

🚧 In Progress:

- Edit functionality
- Note search
- Basic organization

🔜 Coming Soon:

- Pro features (folders, tags)
- Advanced search
- Bulk operations
