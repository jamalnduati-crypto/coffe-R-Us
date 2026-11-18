import { useParams, Link } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';
import EditProductForm from '../components/EditProductForm';

// ProductDetail
// Shows one product, chosen by the :id in the URL, with an edit form.
function ProductDetail() {
  const { id } = useParams(); // route params are always strings
  const { products, loading, error, updateProduct } = useProductsContext();

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-600">Something went wrong: {error}</p>;

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <section className="px-8 py-10">
        <p className="mb-4">Product not found.</p>
        <Link to="/coffee" className="text-orange-600 underline">Back to the coffee list</Link>
      </section>
    );
  }

  return (
    <section className="px-8 py-10">
      <Link to="/coffee" className="text-orange-600 underline">&larr; Back to all coffee</Link>
      <h1 className="mt-4 text-4xl font-bold">{product.name}</h1>
      <p className="mt-1 text-gray-500">Origin: {product.origin}</p>
      <p className="mt-4 max-w-xl text-gray-700">{product.description}</p>
      <p className="mt-4 text-2xl font-bold text-orange-600">${Number(product.price).toFixed(2)}</p>

      {/* key makes the form reset if you navigate to a different product */}
      <EditProductForm key={product.id} product={product} onSave={updateProduct} />
    </section>
  );
}

export default ProductDetail;
