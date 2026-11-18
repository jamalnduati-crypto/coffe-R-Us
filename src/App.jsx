import { Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';

// App: provides shared product data and defines the routes.
function App() {
  return (
    <ProductsProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee" element={<ProductList />} />
        <Route path="/coffee/:id" element={<ProductDetail />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </ProductsProvider>
  );
}

export default App;
