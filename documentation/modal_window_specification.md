# Modal Window Specification

## Overview

All modal windows in HomeTruth should follow these specifications to ensure consistency across the application.

## Core Requirements

### 1. Visual Design

- Semi-transparent dark overlay (background-color: rgba(0, 0, 0, 0.5))
- Centered white content area with rounded corners
- Drop shadow for depth
- Maximum width based on content type (default: max-w-4xl)
- Responsive padding (p-6 on mobile, p-8 on desktop)

### 2. Standard Components

- Close button in top-right corner
  - "X" icon (FaTimes from react-icons)
  - Hover state with slight opacity change
  - Accessible (aria-label="Close")
- Title section at top
  - Clear heading (text-2xl font-bold)
  - Optional subtitle/description
- Content area with appropriate spacing
- Optional footer area for actions

### 3. Behavior

- Click outside to close
- ESC key to close
- Trap focus within modal
- Prevent background scroll
- Smooth entrance/exit animations

### 4. Accessibility

- Role="dialog"
- Aria-modal="true"
- Aria-labelledby pointing to title
- Focus management
- Screen reader considerations

## Implementation Example
