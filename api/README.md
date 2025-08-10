# ZeeLink API

This is the backend for ZeeLink, a lightweight SaaS platform that enables users to create a customizable link-in-bio page, showcase a portfolio, and sell products.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Overview](#project-overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Commands](#commands)

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, create a `.env` file from the `.env.example` file and fill in the required environment variables.

Finally, run the development server:

```bash
pnpm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

ZeeLink is a lightweight SaaS platform that enables content creators, online resellers, small businesses, and freelancers to create a customizable link-in-bio page, showcase a portfolio, add an online store with basic e-commerce capabilities, and receive payments directly via Paymob. The platform aims to deliver a fast, minimal, and responsive experience.

## Features

- **User Authentication & Profile Management:** Sign up, login, and logout, edit profile information, and reset password.
- **ZeeLink Page Builder:** Add, edit, delete, and reorder links. Portfolio gallery (images + descriptions). Profile customization (colors, fonts, bio).
- **Lightweight Store:** Add/edit/delete products (title, description, price, image, availability). Mark items as out of stock. Link checkout via platform or WhatsApp.
- **Order Management:** View orders (pending, confirmed, completed), track payment status, and mark orders as fulfilled.
- **Payments:** Paymob integration for card and mobile wallet payments. Payment confirmation & failure handling.
- **Analytics (Basic for MVP):** Track number of visits, clicks on links, and number of product views.

## User Roles

- **Guest/Visitor:** Can view ZeeLink pages, browse portfolios, and view product catalogs. Can place orders or send WhatsApp inquiries.
- **Registered User (Seller):** Can create and manage a ZeeLink page, add links, portfolio items, and products, manage orders and payments, and customize branding.
- **Platform Admin:** Can manage users, monitor transactions, and handle disputes and support requests.

## Database Schema

- **Users:** `id`, `name`, `email`, `password_hash`, `bio`, `profile_image`, `theme_color`, `created_at`, `updated_at`
- **Links:** `id`, `user_id`, `title`, `url`, `position`, `created_at`, `updated_at`
- **Portfolio:** `id`, `user_id`, `image_url`, `title`, `description`, `created_at`, `updated_at`
- **Products:** `id`, `user_id`, `name`, `description`, `price`, `image_url`, `status`, `created_at`, `updated_at`
- **Orders:** `id`, `product_id`, `buyer_name`, `buyer_contact`, `payment_status`, `order_status`, `created_at`, `updated_at`

## API Documentation

The API documentation is generated using Swagger and is available at `/docs`.

## Commands

- `pnpm install`: Install dependencies
- `pnpm run build`: Build the project
- `pnpm run lint`: Lint the codebase
- `pnpm run lint:fix`: Fix linting errors
