export interface User {
  id: string;                    // Unique identifier
  email: string;                 // Primary contact/login
  name: string;                  // Display name
  role: 'free' | 'pro';      // Changed from 'premium'
  createdAt: string;            // Account creation date
  lastLogin: string;            // Last login timestamp
  profileComplete: boolean;      // Onboarding status
} 