# Project Structure and Guidelines

This project is a monorepo with two main directories: admin for the client-side and api for the server-side.

## Client-Side (admin)

The admin directory contains the client-side code, which is a web application. It handles all user interface and interaction logic.

### Admin Key Details

- Location: `./admin`
- Purpose: User-facing application, handles front-end logic and state.
- Technologies: [List the technologies you use, e.g., React, Next.js, etc.]
- Development Commands:
	- `cd admin`

	- `pnpm install` (to install dependencies)

	- `pnpm dev` (to run the development server)

## Server-Side (api)

The api directory contains the server-side code, which is the REST API. It handles all business logic, database interactions, and authentication.

### API Key Details

- Location: `./api`
- Purpose: Provides a REST API for the client-side application.
- Technologies: [List the technologies you use, e.g., Node.js, Express, MongoDB, etc.]
- Development Commands:
	- `cd api`
	- `pnpm install` (to install dependencies)
	- `pnpm start:dev` (to run the development server)

## General Guidelines

- All client-side changes should be made within the `admin` directory.
- All server-side changes and new API endpoints should be created within the `api` directory.
- When working on a feature that involves both the front-end and back-end, be sure to make the corresponding changes in both directories.
