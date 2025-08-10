# zeelink-api OpenCode guidelines

## Project Overview

ZeeLink is a lightweight SaaS platform that enables content creators, online resellers, small businesses, and freelancers to create a customizable link-in-bio page, showcase a portfolio, add an online store with basic e-commerce capabilities, and receive payments directly via Paymob. The platform aims to deliver a fast, minimal, and responsive experience.

## User Roles

- **Guest/Visitor:** Can view ZeeLink pages, browse portfolios, and view product catalogs. Can place orders or send WhatsApp inquiries.
- **Registered User (Seller):** Can create and manage a ZeeLink page, add links, portfolio items, and products, manage orders and payments, and customize branding.
- **Platform Admin:** Can manage users, monitor transactions, and handle disputes and support requests.

## Core Features

- **User Authentication & Profile Management:** Sign up, login, and logout, edit profile information, and reset password.
- **ZeeLink Page Builder:** Add, edit, delete, and reorder links. Portfolio gallery (images + descriptions). Profile customization (colors, fonts, bio).
- **Lightweight Store:** Add/edit/delete products (title, description, price, image, availability). Mark items as out of stock. Link checkout via platform or WhatsApp.
- **Order Management:** View orders (pending, confirmed, completed), track payment status, and mark orders as fulfilled.
- **Payments:** Paymob integration for card and mobile wallet payments. Payment confirmation & failure handling.
- **Analytics (Basic for MVP):** Track number of visits, clicks on links, and number of product views.

## Database Schema

- **Users:** `id`, `name`, `email`, `password_hash`, `bio`, `profile_image`, `theme_color`, `created_at`, `updated_at`
- **Links:** `id`, `user_id`, `title`, `url`, `position`, `created_at`, `updated_at`
- **Portfolio:** `id`, `user_id`, `image_url`, `title`, `description`, `created_at`, `updated_at`
- **Products:** `id`, `user_id`, `name`, `description`, `price`, `image_url`, `status`, `created_at`, `updated_at`
- **Orders:** `id`, `product_id`, `buyer_name`, `buyer_contact`, `payment_status`, `order_status`, `created_at`, `updated_at`

## Commands

- `pnpm install`: Install dependencies
- `pnpm run build`: Build the project
- `pnpm run lint`: Lint the codebase
- `pnpm run lint:fix`: Fix linting errors

## Code Style

- Use `prettier` for formatting.
- Use `eslint` for linting.
- Prefer relative imports for modules within the project.
- Prefer absolute imports for modules within the module.
- Use arrow functions for component definitions.
- All functions and variables should be typed.
- Follow a consistent naming convention (`snake_case` for DB attributes, `camelCase` for variables, `PascalCase` for classes/interfaces).
- Handle errors gracefully using `try/catch` blocks or error boundaries.
- Add JSDoc comments to all functions.

## Controllers

- Always use Swagger documentation decorators for any endpoint
- Always use Guards based on what endpoint needs to be protected or it's public

## Git workflow

- Do not initiate any git commands unless asked for 
