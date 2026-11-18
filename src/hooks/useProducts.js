import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/coffee';

// useProducts
// Custom hook that owns the product list and every request to the backend.
// Returns the data, loading/error flags, and functions to add and update products.
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET: load all products once, when the app mounts
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // POST: create a product, then add the server's version (with its id) to state
  function addProduct(newProduct) {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((created) => {
        setProducts((prev) => [...prev, created]);
        return created;
      });
  }

  // PATCH: change some fields, then swap the updated product into state
  // (.map keeps the list order unchanged)
  function updateProduct(id, changes) {
    return fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((updated) => {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        return updated;
      });
  }

  return { products, loading, error, addProduct, updateProduct };
}
