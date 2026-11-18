import { useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

// ProductList
// Shows every product, filtered by the search text.
function ProductList() {
  const { products, loading, error } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Derived data: recalculated each render, not stored in state.
  // Matches the search text against name, description, or origin, ignoring case.
  const term = searchTerm.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.origin.toLowerCase().includes(term)
  );

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-600">Something went wrong: {error}</p>;

  return (
    <section className="px-8 py-10">
      <h1 className="mb-6 text-4xl font-bold">Our Coffee</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No coffee matches your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
