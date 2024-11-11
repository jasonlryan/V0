# Document Vault Specification

## Overview

The Document Vault is a secure storage system for homeowner documents with smart organization features that adapt based on usage patterns.

## Core Components

### 1. Document Storage Room (`pages/documents/index.tsx`)

- Main interface for document management
- Handles loading of documents, folders, and tags
- Displays upload area and document library
- Protected route - requires authentication

### 2. Storage Organization

**Simple View** (≤10 documents):

- Basic list/grid display options
- Sort by date, name, type
- Basic search functionality
- Download/delete actions

**Advanced View** (>10 documents):

- Automatic switch when document count exceeds 10
- Enhanced organization features:
  - Folder system
  - Tag management
  - Advanced filtering
  - Custom sort options

### 3. Document Management

#### Upload System (`DocumentUpload.tsx`)

- Drag-and-drop interface
- File type validation
- Size limits:
  - Free users: Up to 5MB per file, 50MB total
  - Pro users: Up to 25MB per file, unlimited total
- Supported formats: PDF, DOC, DOCX, JPG, PNG
- Upload status indicators
- Error handling

#### Library Interface (`DocumentLibrary.tsx`)

- Responsive grid/list views
- Document preview
- Quick actions:
  - Download
  - Delete
  - Move to folder
  - Add/remove tags
- Sort options:
  - Date uploaded
  - Name
  - Size
  - Type

#### Folder System

- Default folders:
  - Mortgage Documents
  - Insurance
  - Property Records
- Custom folders (Pro feature)
- Move/copy documents between folders
- Folder statistics (document count, total size)

#### Tag System

- Predefined tags:
  - Important (red)
  - To Review (yellow)
  - Archived (gray)
- Custom tags (Pro feature)
- Multiple tags per document
- Tag-based filtering

### 4. State Management (`documentsSlice.ts`)

- Document list
- Folder structure
- Tag system
- Loading states
- Error handling

### 5. Mock API (`lib/api.ts`)

- Document CRUD operations
- Folder management
- Tag management
- Simulated network delays
- Error scenarios

## User Permissions

### Free Users

- Basic document storage
- Default folders only
- Predefined tags only
- Limited storage space
- Basic search

### Pro Users

- Unlimited storage
- Custom folders
- Custom tags
- Advanced search
- Bulk operations
- Document sharing

## Future Enhancements

### Phase 1

- Document preview
- Search within documents
- Bulk operations
- Share functionality

### Phase 2

- OCR for text extraction
- AI-powered document categorization
- Version control
- Collaboration features

### Phase 3

- Document expiry notifications
- Mobile app integration
- Third-party integrations
- Automated backups

## Technical Implementation

### Data Structures

## Access Levels & Permissions

### 1. Unregistered Users

- Cannot access Document Vault
- Redirected to login/signup when attempting to access
- Can see marketing information about Document Vault features
- Shown benefits of document storage and organization

### 2. Free Users

- Cannot access Document Vault
- Can see Document Vault features but with "Upgrade to Pro" prompts
- Shown benefits of document organization and storage
- Clear CTAs to upgrade for access

### 3. Pro Users

- Full Document Vault access:
  - Up to 25MB per file
  - Unlimited total storage
  - All file formats (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG)
- Complete organization features:
  - Custom folders
  - Custom tags with color coding
  - Advanced view with filtering and sorting
  - Full-text search within documents
- Additional features:
  - Document sharing
  - Bulk operations
  - Document version history
  - Document expiry notifications
  - OCR for text extraction
  - AI-powered document categorization
