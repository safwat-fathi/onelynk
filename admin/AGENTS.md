# Agent Instructions

This document outlines the key commands, coding conventions, and style guidelines for this repository.

## Commands

- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Run:** `pnpm dev`

## Code Style

- **Framework:** Next.js (React) with TypeScript.
- **Linting:** Follows `next/core-web-vitals` and `next/typescript` ESLint rules.
- **Formatting:** Use Prettier with default settings for consistency.
- **Imports:** Organize imports in the following order: React, external libraries, internal modules.
- **Naming:**
  - Components: `PascalCase` (e.g., `MyComponent`).
  - Variables/Functions: `camelCase` (e.g., `myVariable`).
  - Types/Interfaces: `PascalCase` (e.g., `MyType`).
- **Types:** Use TypeScript for all new code. Avoid `any` where possible, use type not interface keyword for typing. 
- **Error Handling:** Use `try...catch` blocks for async operations and handle errors gracefully.
- **Forms:** Do not use `<label>` elements for inputs. Instead, use the `placeholder` attribute to label the input.
