// Core user types
export type UserRole = 'free' | 'pro';

export type { User } from './user';

export type { Subscription } from './subscription';
export type { UserPreferences } from './preferences';

// Document and Insight interfaces
export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  category: string;
  url: string;
}

// Add utility function for file size formatting
export const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
};

export interface Insight {
  id: string;
  title: string;
  content: string;
  systemTags: SystemTag[];
  createdAt: string;
  source: 'ai' | 'system';
  category: SystemTag;
}

export type InsightType = 'note' | 'insight';
export enum SystemTag {
  Financial = 'financial',
  Legal = 'legal',
  Maintenance = 'maintenance',
  Insurance = 'insurance',
  Property = 'property',
  Tax = 'tax'
}

export interface KnowledgeItem {
  id: string;
  type: InsightType;           // note or insight
  title: string;               // Brief label/title
  content: string;             // The actual content
  systemTags: SystemTag[];     // Required categorization
  folderId?: string;          // Optional organization
  createdAt: string;
  source: 'ai' | 'system';    // Who created it
  relatedDocuments?: string[]; // Links to documents
}

// Add to existing types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  canSave?: boolean;  // Only AI responses can be saved
}

// Add to KnowledgeItem
export interface SaveNoteRequest {
  title: string;
  content: string;
  systemTags: SystemTag[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  source: 'note' | 'insight';
} 