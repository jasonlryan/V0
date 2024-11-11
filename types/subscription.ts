export interface Subscription {
  id: string;                    // Subscription identifier
  userId: string;                // Reference to user
  plan: 'free' | 'pro';      // Subscription level
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  features: {                    // Available features
    documentStorage: number;     // Storage limit in MB
    aiQueries: number;          // Monthly AI query limit
    maxInsights: number;        // Max saved insights
  };
  billingInfo?: {
    interval: 'monthly' | 'yearly';
    amount: number;
    currency: string;
  };
} 