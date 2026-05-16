# Furns Online Store Frontend

Furns is a Next.js furniture e-commerce frontend for the MIS3202 online store project. It connects to a deployed backend API for product catalog data and uses Keycloak for customer/admin authentication before protected actions such as checkout, payments, order history, and admin management.

## Project Structure

```text
.
├── package.json              # Root scripts that proxy into furns-react
├── README.md                 # Main project documentation
└── furns-react/
    ├── package.json          # Next.js application dependencies and scripts
    ├── .env.template         # Required environment variables
    ├── src/
    │   ├── pages/            # Next.js routes
    │   ├── components/       # Reusable UI and layout components
    │   ├── services/         # API and Keycloak helpers
    │   ├── data/             # Local fallback/mock data
    │   ├── global/           # Redux store and cart state
    │   └── utils/            # Shared utility functions
    └── public/               # Images and static assets
```

## Main Features

- Customer storefront with product listing, category browsing, search, product details, cart, checkout, and order history.
- Product catalog reads from the deployed backend:
  - `GET /categories`
  - `GET /products`
  - `GET /products/slug/{slug}`
  - `GET /products/{id}`
- Keycloak login and registration using the configured `online-store` realm.
- Checkout blocks payment unless the customer is signed in.
- Admin screens for orders, products, payments, audit logs, order status updates, and product stock updates.
- Local fallback catalog data is kept so the UI can still render if the public API is temporarily unavailable.

## Technology Stack

- Next.js 12
- React 17
- Redux Toolkit and Redux Persist for cart state
- Styled Components and Bootstrap Styled UI primitives
- Keycloak OpenID Connect Authorization Code + PKCE flow
- Deployed REST backend at `http://178.105.114.143/api`

## Requirements

- Node.js compatible with Next.js 12
- npm
- Access to the deployed API server
- SSH access to the server if you want to use Keycloak locally through the tunnel

## Environment Variables

The frontend reads environment variables from `furns-react/.env.local`.

Use this content:

```env
NEXT_PUBLIC_API_BASE_URL=http://178.105.114.143/api
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=online-store
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=online-store-app
```

`furns-react/.env.local` is intentionally ignored by git. `furns-react/.env.template` contains the same keys as a template.

## Backend API

Base URL:

```text
http://178.105.114.143/api
```

Public endpoints:

```bash
curl http://178.105.114.143/api/health
curl http://178.105.114.143/api/categories
curl http://178.105.114.143/api/products
curl http://178.105.114.143/api/products/PRODUCT_ID_HERE
curl http://178.105.114.143/api/products/slug/aurora-fabric-sofa
```

Protected customer endpoints:

```text
POST /cart/items
GET  /cart
POST /checkout
POST /payments/create
GET  /orders
```

Protected admin endpoints:

```text
GET   /admin/orders
GET   /admin/payments
GET   /admin/audit-logs
PATCH /admin/orders/{id}/status
PATCH /admin/products/{id}/stock
```

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

## Keycloak Access

Keycloak runs on the remote server. Use an SSH tunnel so the frontend can access it at `localhost:8080`:

```bash
ssh -L 8080:127.0.0.1:8080 root@178.105.114.143
```

Then open the Keycloak admin console:

```text
http://localhost:8080/admin
```

The frontend is configured to use:

```text
Keycloak URL:      http://localhost:8080
Realm:             online-store
Client ID:         online-store-app
Callback route:    http://localhost:3000/auth/callback
```

Make sure the Keycloak client allows the frontend callback URL and local web origin:

```text
Valid redirect URI: http://localhost:3000/auth/callback
Web origin:         http://localhost:3000
```

## Install and Run

Install dependencies from the app folder:

```bash
cd furns-react
npm install
```

Or from the repository root if dependencies are already installed:

```bash
npm install --prefix furns-react
```

Start the development server from the repository root:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The root `package.json` proxies these scripts into `furns-react`:

```bash
npm run dev
npm run build
npm run start
```

## Production Build

Build the Next.js app:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## Customer Flow

1. Browse products on `/`, `/shop`, `/collection/{slug}`, or `/product/{slug}`.
2. Add products to the cart.
3. Go to `/checkout`.
4. If the customer is not signed in, checkout shows login and sign-up actions.
5. Login or sign up through Keycloak.
6. Return to checkout and place the order.
7. The frontend sends:
   - `POST /checkout`
   - `POST /payments/create`
8. If the backend returns a `checkout_url`, the browser redirects to it.
9. Customers can view orders at `/account/orders` after login.

Payment is not meant to be completed by directly opening `/payment/processing`. That page also checks for a login token and shows login/sign-up actions when the user is not authenticated.

## Admin Flow

1. Open `/admin/login`.
2. Login through Keycloak with a user that has the admin role.
3. Use admin pages:
   - `/admin`
   - `/admin/orders`
   - `/admin/payments`
   - `/admin/audit-logs`
   - `/admin/products`
4. Admin actions call protected backend endpoints with the Keycloak bearer token:
   - order status update
   - product stock update

The frontend does not hard-code admin credentials. Admin access depends on the roles configured in Keycloak and enforced by the backend.

## Important Routes

Customer:

```text
/                         Home page
/shop                     Product listing
/collection/{slug}        Category listing
/product/{slug}           Product details
/cart                     Cart
/checkout                 Checkout and payment start
/login                    Customer login
/register                 Customer registration
/account                  Account summary
/account/orders           Customer order history
```

Admin:

```text
/admin/login              Admin login
/admin                    Admin dashboard
/admin/orders             Admin order list
/admin/orders/{id}        Admin order details and status update
/admin/payments           Admin payment list
/admin/audit-logs         Admin audit logs
/admin/products           Admin product list
/admin/products/{id}/edit Product stock update
```

Auth:

```text
/auth/callback            Keycloak OAuth callback
```

## Key Source Files

```text
furns-react/src/services/api.js
```

Central API adapter. It normalizes backend product/category/order/payment/audit payloads into the shapes used by the existing React components. It also contains protected endpoint helpers.

```text
furns-react/src/services/auth.js
```

Keycloak PKCE login, registration, callback token exchange, local token storage, bearer header helpers, and simple JWT profile parsing.

```text
furns-react/src/pages/checkout.jsx
```

Checkout form and payment start. This page blocks payment when the user is not signed in.

```text
furns-react/src/global/actions/cartAction.js
```

Redux cart actions. If a Keycloak token exists, adding to cart also attempts `POST /cart/items`.

## Data Handling Notes

The original template expected Shopify-style product objects. The backend returns simpler product records. `src/services/api.js` converts backend records into the existing component shape so the storefront can use the backend without rewriting every product component.

Example backend product:

```json
{
  "id": "5b647a6f-46ed-4ea1-93c3-131cf5dc4996",
  "name": "Aurora Fabric Sofa",
  "slug": "aurora-fabric-sofa",
  "description": "A comfortable three-seat sofa...",
  "price": 899.0,
  "currency": "USD",
  "sku": "VARIANT-AURORA-FABRIC-SOFA",
  "category": "Living Room",
  "stock_quantity": 10,
  "image_url": "/images/furniture/couch_1.jpeg"
}
```

The frontend normalizes it to include fields such as:

```text
title
handle
images.edges
variants.edges
collections.edges
```

## Troubleshooting

If products do not load:

```bash
curl http://178.105.114.143/api/health
curl http://178.105.114.143/api/products
```

If login does not redirect correctly:

1. Confirm the SSH tunnel is running.
2. Open `http://localhost:8080/admin`.
3. Check that the `online-store-app` client exists.
4. Check that `http://localhost:3000/auth/callback` is allowed as a redirect URI.
5. Check browser console errors for CORS or invalid redirect messages.

If checkout says login is required:

That is expected when no Keycloak access token exists in browser local storage. Login or sign up first, then return to checkout.

If protected API calls return `401`:

The request did not include a valid bearer token, the token expired, or the user does not have the required role. Login again and confirm the Keycloak user roles.

## Current Limitations

- Token refresh is not implemented. If a token expires, login again.
- Some protected pages keep local mock data as a visual fallback until a valid token is available.
- Admin authorization is expected to be enforced by the backend and Keycloak roles.
- The UI uses existing template components, so the API adapter normalizes backend data rather than replacing every product component.

## Useful Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server after build
npm run start

# Check API health
curl http://178.105.114.143/api/health

# Start Keycloak tunnel
ssh -L 8080:127.0.0.1:8080 root@178.105.114.143
```
