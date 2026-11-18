import { useState, useId } from 'react';

// EditProductForm
// Lets the administrator change a product's price and description.
// Props: product (object), onSave (function that sends the PATCH request).
function EditProductForm({ product, onSave }) {
  // useId makes unique ids so each <label> is linked to its input (accessibility)
  const baseId = useId();
  const [price, setPrice] = useState(String(product.price));
  const [description, setDescription] = useState(product.description);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    // Validate before sending anything to the server
    const newPrice = Number(price);
    if (price === '' || Number.isNaN(newPrice) || newPrice < 0) {
      setMessage('Please enter a valid price.');
      return;
    }

    onSave(product.id, { price: newPrice, description: description.trim() })
      .then(() => setMessage('Saved!'))
      .catch(() => setMessage('Could not save. Is the server running?'));
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-2xl font-bold">Edit product</h2>

      <label htmlFor={`${baseId}-price`} className="font-semibold">Price ($)</label>
      <input
        id={`${baseId}-price`}
        type="number"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
      />

      <label htmlFor={`${baseId}-description`} className="font-semibold">Description</label>
      <textarea
        id={`${baseId}-description`}
        rows={3}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
      />

      <button type="submit" className="cursor-pointer rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
        Save changes
      </button>
      {message && <p role="status" className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}

export default EditProductForm;
