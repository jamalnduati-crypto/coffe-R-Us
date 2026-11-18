import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const product = {
  id: 1,
  name: 'Vanilla Bean',
  description: 'Medium Roast, nutty flavor',
  origin: 'Colombia',
  price: 10,
};

test('renders the product details from props', () => {
  // ProductCard contains a Link, so it needs a router around it
  render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
  expect(screen.getByText('Medium Roast, nutty flavor')).toBeInTheDocument();
  expect(screen.getByText('$10.00')).toBeInTheDocument();
});

test('links to the product detail page', () => {
  render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  expect(screen.getByRole('link')).toHaveAttribute('href', '/coffee/1');
});
