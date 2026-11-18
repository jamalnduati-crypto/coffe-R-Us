import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

test('shows the current search term', () => {
  render(<SearchBar searchTerm="viet" onSearchChange={() => {}} />);
  expect(screen.getByPlaceholderText('Search coffee...')).toHaveValue('viet');
});

test('calls onSearchChange when the user types', async () => {
  const handleChange = vi.fn();
  render(<SearchBar searchTerm="" onSearchChange={handleChange} />);

  await userEvent.type(screen.getByPlaceholderText('Search coffee...'), 'a');

  expect(handleChange).toHaveBeenCalledWith('a');
});
