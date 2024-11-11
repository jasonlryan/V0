import type { User, Document, Insight } from '../types';

// Export TEST_USERS
export const TEST_USERS = {
  free: {
    email: "free@hometruth.com",
    password: "free123",
    userData: {
      id: "free-user-1",
      email: "free@hometruth.com",
      name: "Free User",
      role: 'free' as const,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profileComplete: true
    }
  },
  pro: {
    email: "pro@hometruth.com",
    password: "pro123",
    userData: {
      id: "pro-user-1",
      email: "pro@hometruth.com",
      name: "Pro User",
      role: 'pro' as const,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profileComplete: true
    }
  }
};

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      if (credentials.email === TEST_USERS.free.email && 
          credentials.password === TEST_USERS.free.password) {
        return {
          user: TEST_USERS.free.userData,
          token: "mock-jwt-token-free"
        };
      }
      if (credentials.email === TEST_USERS.pro.email && 
          credentials.password === TEST_USERS.pro.password) {
        return {
          user: TEST_USERS.pro.userData,
          token: "mock-jwt-token-pro"
        };
      }
      throw new Error("Invalid credentials");
    }
  },
  documents: {
    upload: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      // Mock successful upload
      return {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        category: 'general',
        url: '#'
      };
    },
    list: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock documents for testing
      return [
        {
          id: '1',
          name: 'Mortgage Agreement.pdf',
          type: 'pdf',
          size: 1024 * 1024,
          uploadedAt: new Date().toISOString(),
          category: 'mortgage',
          url: '#'
        },
        {
          id: '2',
          name: 'Insurance Policy.pdf',
          type: 'pdf',
          size: 2048 * 1024,
          uploadedAt: new Date().toISOString(),
          category: 'insurance',
          url: '#'
        },
        {
          id: '3',
          name: 'Property Survey.pdf',
          type: 'pdf',
          size: 3072 * 1024,
          uploadedAt: new Date().toISOString(),
          category: 'property',
          url: '#'
        }
      ];
    },
    delete: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    },
    folders: {
      list: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
          {
            id: 'folder-1',
            name: 'Mortgage Documents',
            documents: ['1']  // Document IDs
          },
          {
            id: 'folder-2',
            name: 'Insurance',
            documents: ['2']
          },
          {
            id: 'folder-3',
            name: 'Property Records',
            documents: ['3']
          }
        ];
      }
    },
    tags: {
      list: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
          {
            id: 'tag-1',
            name: 'Important',
            color: 'red'
          },
          {
            id: 'tag-2',
            name: 'To Review',
            color: 'yellow'
          },
          {
            id: 'tag-3',
            name: 'Archived',
            color: 'gray'
          }
        ];
      }
    }
  },
  notes: {
    list: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 'note-1',
          title: 'Note: Understanding mortgage rates and how they affect monthly payments',
          content: 'Mortgage rates are determined by several factors including credit score, down payment, and market conditions. A 1% difference in rate can significantly impact your monthly payment. For example, on a $300,000 loan, this could mean a difference of $200-300 per month.',
          createdAt: new Date('2024-01-15').toISOString(),
          tags: ['financial']
        },
        {
          id: 'insight-1',
          title: 'Insight: Your home insurance may have coverage gaps',
          content: `Based on your uploaded insurance policy, we noticed potential coverage gaps for flood damage. Your policy limit of $250,000 for water damage specifically excludes natural flood events. Given your property's location in a zone AE flood area, we recommend reviewing additional flood insurance options. Key considerations:

1. FEMA flood maps show increased risk in your area
2. Standard policies often exclude flood damage
3. Separate flood insurance typically has a 30-day waiting period`,
          createdAt: new Date('2024-01-22').toISOString(),
          tags: ['insurance', 'insight'],
          type: 'insight',
          relatedDocuments: ['insurance-policy-2024'],
          priority: 'high',
          backgroundColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        },
        {
          id: 'note-2',
          title: 'Note: Essential spring maintenance tasks for homeowners',
          content: 'Key spring maintenance tasks: 1) Clean gutters and downspouts, 2) Inspect roof for winter damage, 3) Check exterior paint and caulking, 4) Service HVAC system, 5) Test irrigation systems. Regular maintenance prevents costly repairs later.',
          createdAt: new Date('2024-01-20').toISOString(),
          tags: ['maintenance']
        },
        {
          id: 'note-3',
          title: 'Note: Understanding home insurance coverage types',
          content: 'Different types of home insurance coverage: 1) Dwelling coverage - protects the structure, 2) Personal property - covers belongings, 3) Liability - protects against lawsuits, 4) Additional living expenses - covers temporary housing if needed. Make sure to review and understand your policy limits.',
          createdAt: new Date('2024-01-25').toISOString(),
          tags: ['insurance']
        }
      ];
    },
    save: async (note: { title: string; content: string; tags?: string[] }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: `note-${Date.now()}`,
        ...note,
        createdAt: new Date().toISOString()
      };
    },
    delete: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    },
    update: async (id: string, updates: { title?: string; content?: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id,
        ...updates,
        createdAt: new Date().toISOString()
      };
    },
  }
}; 