import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const coffee = [
  { id: 1, name: 'Vanilla Bean', description: 'Medium Roast, nutty flavor', origin: 'Colombia', price: 10 },
  { id: 2, name: 'House Blend', description: 'Dark Roast, rich flavor', origin: 'Vietnam', price: 12 },
];

const storeInfo = [
  { id: 1, name: 'Coffee R Us', description: 'The go to store for coffee', phone_number: '555-5555' },
];

// Replace fetch with a fake backend, so tests never touch the network
function mockBackend() {
  const reply = (data) => Promise.resolve({ ok: true, json: async () => data });

  global.fetch = vi.fn((url, options = {}) => {
    const method = options.method || 'GET';

    if (method === 'POST') {
      return reply({ id: 3, ...JSON.parse(options.body) });
    }
    if (method === 'PATCH') {
      const id = Number(url.split('/').pop());
      const original = coffee.find((p) => p.id === id);
      return reply({ ...original, ...JSON.parse(options.body) });
    }
    if (url.endsWith('/store_info')) return reply(storeInfo);
    return reply(coffee);
  });
}

function renderApp(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockBackend();
});

test('landing page shows the store info from the backend', async () => {
  renderApp('/');
  expect(await screen.findByRole('heading', { name: 'Coffee R Us' })).toBeInTheDocument();
  expect(screen.getByText('The go to store for coffee')).toBeInTheDocument();
});

test('the product list shows every coffee', async () => {
  renderApp('/coffee');
  expect(await screen.findByText('Vanilla Bean')).toBeInTheDocument();
  expect(screen.getByText('House Blend')).toBeInTheDocument();
});

test('search filters the products as the user types', async () => {
  renderApp('/coffee');
  await screen.findByText('Vanilla Bean');

  await userEvent.type(screen.getByPlaceholderText('Search coffee...'), 'viet');

  expect(screen.getByText('House Blend')).toBeInTheDocument();
  expect(screen.queryByText('Vanilla Bean')).not.toBeInTheDocument();
});

test('shows a message when nothing matches the search', async () => {
  renderApp('/coffee');
  await screen.findByText('Vanilla Bean');

  await userEvent.type(screen.getByPlaceholderText('Search coffee...'), 'zzz');

  expect(screen.getByText('No coffee matches your search.')).toBeInTheDocument();
});

test('clicking a navbar link changes the page', async () => {
  renderApp('/');
  await screen.findByRole('heading', { name: 'Coffee R Us' });

  await userEvent.click(screen.getByRole('link', { name: 'Coffee' }));

  expect(await screen.findByRole('heading', { name: 'Our Coffee' })).toBeInTheDocument();
});

test('the administrator can change a price', async () => {
  renderApp('/coffee/1');
  await screen.findByRole('heading', { name: 'Vanilla Bean' });

  const priceInput = screen.getByLabelText('Price ($)');
  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, '15');
  await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));

  expect(await screen.findByText('Saved!')).toBeInTheDocument();
  expect(screen.getByText('$15.00')).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:3001/coffee/1',
    expect.objectContaining({ method: 'PATCH' })
  );
});

test('the administrator can add a product', async () => {
  renderApp('/add');

  await userEvent.type(screen.getByLabelText('Name'), 'Night Owl');
  await userEvent.type(screen.getByLabelText('Origin'), 'Kenya');
  await userEvent.type(screen.getByLabelText('Description'), 'Bold and chocolatey');
  await userEvent.type(screen.getByLabelText('Price ($)'), '16');
  await userEvent.click(screen.getByRole('button', { name: 'Add product' }));

  // After the POST succeeds, the app opens the new product's page
  expect(await screen.findByRole('heading', { name: 'Night Owl' })).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:3001/coffee',
    expect.objectContaining({ method: 'POST' })
  );
});

test('the add form rejects a missing field', async () => {
  renderApp('/add');

  await userEvent.click(screen.getByRole('button', { name: 'Add product' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Please fill in every field.');
});
