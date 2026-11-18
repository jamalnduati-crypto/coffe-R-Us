import { useState, useId, useRef, useEffect } from 'react';

// ProductForm
// Controlled form for creating a new product.
// Props: onAdd (function that sends the POST request and returns a Promise).
function ProductForm({ onAdd }) {
  const baseId = useId();                 // unique ids to link labels and inputs
  const nameRef = useRef(null);           // direct access to the name input
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  // Focus the first field when the form appears
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const newPrice = Number(price);
    if (!name.trim() || !origin.trim() || !description.trim()) {
      setError('Please fill in every field.');
      return;
    }
    if (price === '' || Number.isNaN(newPrice) || newPrice < 0) {
      setError('Please enter a valid price.');
      return;
    }

    onAdd({
      name: name.trim(),
      origin: origin.trim(),
      description: description.trim(),
      price: newPrice,
    }).catch(() => setError('Could not add the product. Is the server running?'));
  }

  const inputClass =
    'rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
      <label htmlFor={`${baseId}-name`} className="font-semibold">Name</label>
      <input id={`${baseId}-name`} ref={nameRef} type="text" value={name}
        onChange={(event) => setName(event.target.value)} className={inputClass} />

      <label htmlFor={`${baseId}-origin`} className="font-semibold">Origin</label>
      <input id={`${baseId}-origin`} type="text" value={origin}
        onChange={(event) => setOrigin(event.target.value)} className={inputClass} />

      <label htmlFor={`${baseId}-description`} className="font-semibold">Description</label>
      <textarea id={`${baseId}-description`} rows={3} value={description}
        onChange={(event) => setDescription(event.target.value)} className={inputClass} />

      <label htmlFor={`${baseId}-price`} className="font-semibold">Price ($)</label>
      <input id={`${baseId}-price`} type="number" step="0.01" value={price}
        onChange={(event) => setPrice(event.target.value)} className={inputClass} />

      <button type="submit" className="cursor-pointer rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
        Add product
      </button>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </form>
  );
}

export default ProductForm;
