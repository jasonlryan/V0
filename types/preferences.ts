export interface UserPreferences {
  notifications: {
    email: boolean;              // Email notifications
    push: boolean;               // Push notifications
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large';
    language: string;           // Preferred language
  };
  privacy: {
    shareInsights: boolean;     // Allow sharing insights
    publicProfile: boolean;     // Public profile visibility
  };
  documents: {
    defaultSort: 'name' | 'date' | 'type';
    defaultView: 'grid' | 'list';
    autoCategories: boolean;    // Auto-categorize uploads
  };
} 