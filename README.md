# Coffee R Us: Admin Portal

A React single-page app for managing an online coffee store. Administrators can browse products, search them, add new ones, and edit price and description. Data is saved through a simulated backend (json-server).

## Features

- Landing page with store details loaded from the backend
- Product list with live search (name, description, or origin)
- Product page for each coffee (dynamic route `/coffee/:id`)
- Admin form to edit a product's price and description (PATCH)
- Admin form to add a new product (POST)
- Responsive layout built with Tailwind CSS
- Unit tests with Vitest and React Testing Library

## Tech stack

React, Vite, React Router, Tailwind CSS, json-server, Vitest, React Testing Library.

## Setup

```bash
git clone <your-repo-url>
cd coffee-admin
npm install
```

Run the backend and the app in two terminals:

```bash
npm run server   # json-server on http://localhost:3001
npm run dev      # the app, usually on http://localhost:5173
```

## Run the tests

```bash
npm test
```

## Project structure

```
src/
├── components/   Navbar, SearchBar, ProductCard, ProductForm, EditProductForm
├── pages/        Home, ProductList, ProductDetail, AddProduct
├── context/      ProductsContext (shares product data)
├── hooks/        useProducts (fetching, adding, updating)
└── __tests__/    tests
db.json           mock data
```

## How it works

The `useProducts` custom hook loads products with a GET request and exposes `addProduct` (POST) and `updateProduct` (PATCH). `ProductsProvider` shares that data through React Context, so pages read it with `useProductsContext` instead of passing props down.

## Known limitations

- The backend is json-server, intended for development, so there is no authentication.
- There is no delete feature.
- The app expects the backend to be running on port 3001.

## Screenshot

![Product list](screenshots/products.png)
