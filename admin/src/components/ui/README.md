# UI Components

This directory contains reusable UI components for the ZeeLink admin dashboard.

## Components

1. [Avatar](./Avatar.md) - A component that can display either an image or fallback to text initials
2. SearchInput - A searchable input with autocomplete and localStorage caching

## Usage

```jsx
// Import specific components
import { Avatar } from '@/components/ui'

// Or import individual components
import Avatar from '@/components/ui/Avatar'
import SearchInput from '@/components/ui/SearchInput'
```

## Adding New Components

1. Create a new component directory file in this directory (e.g., `Button/index.tsx`)
2. Do not export component via `index.ts` file instead from index.tsx
