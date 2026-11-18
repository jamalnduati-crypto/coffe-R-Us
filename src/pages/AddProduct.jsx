import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';
import ProductForm from '../components/ProductForm';

// AddProduct
// Page for the add-product form. After a successful POST, it opens the new product.
function AddProduct() {
  const { addProduct } = useProductsContext();
  const navigate = useNavigate();

  function handleAdd(values) {
    return addProduct(values).then((created) => navigate(`/coffee/${created.id}`));
  }

  return (
    <section className="px-8 py-10">
      <h1 className="mb-6 text-4xl font-bold">Add a Product</h1>
      <ProductForm onAdd={handleAdd} />
    </section>
  );
}

export default AddProduct;
