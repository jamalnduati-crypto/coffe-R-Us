import { Link } from 'react-router-dom';

// ProductCard
// Shows one product's summary and links to its detail page.
// Props: product (object with id, name, description, origin, price).
function ProductCard({ product }) {
  const { id, name, description, origin, price } = product;

  return (
    <Link
      to={`/coffee/${id}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
    >
      <h3 className="mb-1 text-xl font-bold">{name}</h3>
      <p className="mb-3 text-sm text-gray-500">Origin: {origin}</p>
      <p className="mb-4 text-gray-600">{description}</p>
      <p className="text-lg font-bold text-orange-600">${Number(price).toFixed(2)}</p>
    </Link>
  );
}

export default ProductCard;
