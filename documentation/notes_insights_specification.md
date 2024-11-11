# Notes & Insights System Specification

## Overview

HomeTruth provides two types of saved knowledge:

1. Notes - User-saved AI chat responses
2. Insights - System-generated document analysis

## Core Components

### 1. Notes System

- Saved from AI chat responses
- White background
- Format: "Note: [Summary Title]"
- Optional user tags (Pro only)
- Optional folder organization (Pro only)

### 2. Insights System (Pro Only)

- Generated from document analysis
- Pale blue background
- Format: "Insight: [Insight Title]"
- Automatic tagging based on content
- Links to relevant documents

## Access Levels

### Unregistered Users

- Can see AI chat responses
- Cannot save notes
- Cannot see insights
- Prompted to sign up when trying to save

### Free Users

- Can save up to 5 notes
- Basic note organization
- No custom tags
- No folders
- No insights
- Clear upgrade prompts when limit reached

### Pro Users

- Unlimited notes
- Full folder organization
- Custom tagging system
- Full insights access
- Document linking

## Organization System

### Tags

**Initial Taxonomy:**

- Financial
- Legal
- Maintenance
- Insurance
- Property
- Tax

**Future Enhancement:**

- User-defined tags
- Tag color coding
- Tag-based filtering

### Folders (Pro Only)

- Optional organization
- Nested folder support
- Move/copy between folders
- Folder sharing (future)

## UI Components

### Notes Interface

- Save button on AI responses
- Title generation from content
- Tag selection (Pro)
- Folder selection (Pro)
- Note preview
- Edit/Delete options

### Insights Dashboard (Pro)

- Document-based insights
- Related document links
- Auto-categorization
- Priority flagging
- Action recommendations

## State Management

### Notes Slice
