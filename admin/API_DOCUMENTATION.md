# ZeeLink API Documentation

## 1. Project Overview

ZeeLink is a comprehensive API that provides a platform for users to showcase their products, share links, and manage a professional portfolio. It serves as a centralized backend for a "link-in-bio" style application, handling user authentication, data storage, and business logic.

Key features include:

- User authentication (signup, login, token refresh).
- Product management (CRUD operations for user products).
- Link management (CRUD operations for user-managed links).
- Order processing with distinct buyer/seller relationships.
- Portfolio management.

---

## 2. Data Models

This section details the core data entities used throughout the API.

### User

Represents a user of the application.

| Field           | Type      | Description                                            |
|-----------------|-----------|--------------------------------------------------------|
| `id`            | `number`  | Unique identifier for the user.                        |
| `name`          | `string`  | The user's full name.                                  |
| `email`         | `string`  | The user's email address (must be unique).             |
| `password`      | `string`  | Hashed password (not returned in API responses).       |
| `bio`           | `string`  | A short biography or description for the user's profile.|
| `profile_image` | `string`  | URL to the user's profile picture.                     |
| `theme_color`   | `string`  | A hex color code for profile theming.                  |
| `created_at`    | `Date`    | Timestamp of when the user was created.                |
| `updated_at`    | `Date`    | Timestamp of the last update.                          |

### Product

Represents a product that a user can list.

| Field         | Type            | Description                               |
|---------------|-----------------|-------------------------------------------|
| `id`          | `number`        | Unique identifier for the product.        |
| `user`        | `User`          | The user who owns this product.           |
| `name`        | `string`        | The name of the product.                  |
| `description` | `string`        | A detailed description of the product.    |
| `price`       | `number`        | The price of the product.                 |
| `image_url`   | `string`        | URL to the product's image.               |
| `status`      | `ProductStatus` | Availability status (`available`, `out_of_stock`). |
| `created_at`  | `Date`          | Timestamp of when the product was created.|
| `updated_at`  | `Date`          | Timestamp of the last update.             |

### Link

Represents a URL link that a user can share on their profile.

| Field      | Type     | Description                               |
|------------|----------|-------------------------------------------|
| `id`       | `number` | Unique identifier for the link.           |
| `user`     | `User`   | The user who owns this link.              |
| `title`    | `string` | The display title for the link.           |
| `url`      | `string` | The destination URL.                      |
| `position` | `number` | The display order of the link.            |
| `created_at`| `Date`   | Timestamp of when the link was created.   |
| `updated_at`| `Date`   | Timestamp of the last update.             |

### Order

Represents an order placed for a product.

| Field            | Type          | Description                               |
|------------------|---------------|-------------------------------------------|
| `id`             | `number`      | Unique identifier for the order.          |
| `buyer`          | `User`        | The user who placed the order.            |
| `seller`         | `User`        | The user who will fulfill the order.      |
| `payment_status` | `PaymentStatus`| Payment status (`pending`, `paid`, `failed`). |
| `order_status`   | `OrderStatus` | Order status (`pending`, `fulfilled`, `cancelled`). |
| `created_at`     | `Date`        | Timestamp of when the order was created.  |
| `updated_at`     | `Date`        | Timestamp of the last update.             |

### Portfolio

Represents a portfolio item for a user.

| Field         | Type     | Description                               |
|---------------|----------|-------------------------------------------|
| `id`          | `number` | Unique identifier for the portfolio item. |
| `user`        | `User`   | The user who owns this item.              |
| `image_url`   | `string` | URL to the portfolio item's image.        |
| `title`       | `string` | The title of the portfolio item.          |
| `description` | `string` | A description of the portfolio item.      |
| `created_at`  | `Date`   | Timestamp of when the item was created.   |
| `updated_at`  | `Date`   | Timestamp of the last update.             |

---

## 3. API Endpoints

This section describes the available API endpoints.

### Authentication (`/auth`)

#### **`POST /auth/signup`**
- **Description:** Registers a new user.
- **Authentication:** None.
- **Request Body:** `SignUpDto` (`name`, `email`, `password`, `confirm_password`).
- **Success Response:** `201 Created` with the new user object (password excluded) and JWT tokens.

#### **`POST /auth/login`**
- **Description:** Logs in a user.
- **Authentication:** None.
- **Request Body:** `LoginDto` (`email`, `password`).
- **Success Response:** `200 OK` with the user object and JWT tokens.

#### **`POST /auth/logout`**
- **Description:** Logs out a user and revokes their refresh token.
- **Authentication:** Bearer Token (Access Token).
- **Request Body:** `LogoutDto` (`refresh_token`).
- **Success Response:** `204 No Content`.

#### **`POST /auth/refresh`**
- **Description:** Generates a new pair of access and refresh tokens.
- **Authentication:** Bearer Token (Refresh Token).
- **Request Body:** `{ "refresh_token": "string" }`.
- **Success Response:** `200 OK` with new `access_token` and `refresh_token`.

### Products (`/products`)

#### **`POST /products`**
- **Description:** Creates a new product for the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Request Body:** `CreateProductDto` (`name`, `description`, `price`, `image_url`, `status?`).
- **Success Response:** `201 Created` with the newly created product object.

#### **`GET /products`**
- **Description:** Retrieves a list of all products from all users.
- **Authentication:** None.
- **Success Response:** `200 OK` with an array of product objects.

#### **`GET /products/:id`**
- **Description:** Retrieves a single product by its ID.
- **Authentication:** None.
- **Success Response:** `200 OK` with the product object.

#### **`PATCH /products/:id`**
- **Description:** Updates a product owned by the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Request Body:** `UpdateProductDto` (partial `CreateProductDto`).
- **Success Response:** `200 OK` with the updated product object.

#### **`DELETE /products/:id`**
- **Description:** Deletes a product owned by the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Success Response:** `204 No Content`.

### Links (`/links`)

#### **`POST /links`**
- **Description:** Creates a new link for the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Request Body:** `CreateLinkDto` (`title`, `url`, `position`).
- **Success Response:** `201 Created` with the newly created link object.

#### **`GET /links`**
- **Description:** Retrieves all links for the authenticated user, ordered by position.
- **Authentication:** Bearer Token (Access Token).
- **Success Response:** `200 OK` with an array of link objects.

#### **`GET /links/:id`**
- **Description:** Retrieves a single link by ID, if owned by the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Success Response:** `200 OK` with the link object.

#### **`PATCH /links/:id`**
- **Description:** Updates a link owned by the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Request Body:** `UpdateLinkDto` (partial `CreateLinkDto`).
- **Success Response:** `200 OK` with the updated link object.

#### **`DELETE /links/:id`**
- **Description:** Deletes a link owned by the authenticated user.
- **Authentication:** Bearer Token (Access Token).
- **Success Response:** `204 No Content`.
