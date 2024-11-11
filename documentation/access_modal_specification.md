# Access Modal System Specification

## Overview

The Access Modal system provides consistent access control messaging and options based on user state and feature type (Pro vs Free).

## Trigger Points & Behaviors

### 1. Document Vault Access (Pro Feature)

**Trigger**:

- Clicking "Document Vault" in navigation or sidebar when not logged in
- Attempting to access `/documents` route directly

**Behavior**:

- Title: "Pro Feature"
- Description: "Store and organize all your property documents in one secure place."
- Primary: "Sign Up for Pro"
- Secondary: "Learn More"
- Close: X button

### 2. My Notes Access (Free Feature)

**Trigger**:

- Clicking "My Notes" in navigation or sidebar when not logged in
- Attempting to access `/notes` route directly

**Behavior**:

- Title: "Sign Up to Save Notes"
- Description: "Create a free account to save up to 5 notes from AI chat responses."
- Primary: "Sign Up Free"
- Secondary: "Log In"
- Close: X button

### 3. Save Note (Free Feature)

**Trigger**:

- Clicking "Save Note" on AI response when not logged in

**Behavior**:

- Title: "Sign Up to Save Notes"
- Description: "Create a free account to save up to 5 notes from AI chat responses."
- Primary: "Sign Up Free"
- Secondary: "Log In"
- Close: X button

### 4. Notes - Limit Reached (Upgrade Prompt)

**Trigger**:

- Free user attempting to save 6th note
- Free user clicking "Save Note" when at limit

**Behavior**:

- Title: "Note Limit Reached"
- Description: "You've reached the limit of 5 notes. Upgrade to Pro for unlimited notes."
- Primary: "Upgrade to Pro"
- Secondary: "Learn More"
- Close: X button

## Visual Elements

### Style

- Background: Semi-transparent overlay
- Modal: White background with rounded corners
- Width: Max 400px
- Padding: 24px
- Shadow: Medium drop shadow

### Components

1. **Header**

   - Title: Large, bold text
   - Close button: X icon top right
   - Icon: Lock icon in blue circle

2. **Content**

   - Description text
   - Center aligned
   - Gray text color

3. **Actions**
   - Primary button: Blue background
   - Secondary button: Outline style
   - Full width buttons
   - Stacked vertically
   - 12px gap between buttons

## Implementation Notes

### Component Props
