import { createContext, useContext } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductsContext = createContext(null);

// ProductsProvider
// Runs useProducts once and shares the result with every component below it,
// so pages can read products without passing props through each layer.
export function ProductsProvider({ children }) {
  const value = useProducts();
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

// Convenience hook for reading the shared products data
export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used inside <ProductsProvider>');
  }
  return context;
}
