# MAISON — Full-Stack Fashion E-Commerce

A luxury fashion storefront with a separate admin panel, built with React (Vite) on the
frontend and Node.js + Express + MongoDB (in-memory) on the backend.

```
fashion-store/
├── backend/    → Node.js + Express REST API
├── frontend/   → React (Vite) app
└── README.md
```

## Features

**Storefront**
- Homepage with hero, featured collections, and new arrivals
- Shop page with category / price / size filters and sorting
- Product detail with size selection and add-to-cart
- Persistent cart with quantity controls and subtotal
- Checkout form that places a real order via the API

**Admin panel (`/admin`)**
- JWT-based login (hardcoded admin user)
- Dashboard with product / order / revenue stats
- Product management: list, add (with image upload), edit, delete
- Orders list with status updates (Pending / Shipped / Delivered)
- Dedicated sidebar layout, separate from the store

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React, Vite, React Router, Tailwind CSS, Axios |
| Backend  | Node.js, Express, Mongoose, `mongodb-memory-server`, Multer, JWT, bcrypt |
| Fonts    | Playfair Display (headings), Inter (body) via Google Fonts |

The database is an **in-memory MongoDB** — nothing to install or configure. It is
seeded with 10 sample products and 3 sample orders on every server start.

---

## Getting Started

You need **Node.js 18+**. Run the backend and frontend in two terminals.

### 1. Backend

```bash
cd backend
npm install
npm run dev      # or: npm start
```

The API starts on **http://localhost:5000**. On boot it launches an in-memory
MongoDB, seeds sample data, and serves uploaded images from `/uploads`.

Environment variables live in `backend/.env` (a ready-to-use file is included):

```
PORT=5000
JWT_SECRET=super_secret_change_me_in_production
ADMIN_EMAIL=admin@fashionstore.com
ADMIN_PASSWORD=admin123
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173** and proxies `/api` and `/uploads`
to the backend, so no extra configuration is needed.

> For a production build pointing at a deployed API, set `VITE_API_URL` to the
> backend origin before running `npm run build`.

---

## Admin Access

Visit **http://localhost:5173/admin/login** and sign in with:

```
Email:    admin@fashionstore.com
Password: admin123
```

Admin routes are protected on both ends: the frontend redirects to the login page
when no token is present, and the backend enforces a JWT middleware on all
write/admin endpoints.

---

## API Reference

Base URL: `http://localhost:5000`

### Auth
| Method | Endpoint          | Access | Description |
|--------|-------------------|--------|-------------|
| POST   | `/api/auth/login` | Public | Admin login → returns JWT |

### Products
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| GET    | `/api/products`     | Public | List products (`?category=`, `?search=`) |
| GET    | `/api/products/:id` | Public | Single product |
| POST   | `/api/products`     | Admin  | Create (multipart/form-data, `image` field) |
| PUT    | `/api/products/:id` | Admin  | Update |
| DELETE | `/api/products/:id` | Admin  | Delete |

### Orders
| Method | Endpoint                  | Access | Description |
|--------|---------------------------|--------|-------------|
| GET    | `/api/orders`             | Admin  | List all orders |
| POST   | `/api/orders`             | Public | Place an order |
| PATCH  | `/api/orders/:id/status`  | Admin  | Update order status |

Admin endpoints require an `Authorization: Bearer <token>` header.

---

## Notes

- Sample product images are remote Unsplash URLs; products you upload via the admin
  panel are stored in `backend/uploads/` and served statically.
- Because the database is in-memory, **all data resets when the backend restarts**
  (and is re-seeded). This keeps development friction-free.
