import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Home
// Landing page describing the store. The store details come from the backend.
function Home() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/store_info')
      .then((res) => res.json())
      .then((data) => setStore(data[0])); // store_info is an array with one entry
  }, []);

  return (
    <section className="px-8 py-16">
      <h1 className="mb-4 text-5xl font-bold">{store ? store.name : 'Welcome'}</h1>
      <p className="mb-2 text-xl text-gray-600">
        {store ? store.description : 'Loading...'}
      </p>
      {store && <p className="mb-8 text-gray-500">Call us: {store.phone_number}</p>}

      <Link
        to="/coffee"
        className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
      >
        Browse our coffee
      </Link>
    </section>
  );
}

export default Home;
