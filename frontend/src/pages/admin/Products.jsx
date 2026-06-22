import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imageUrl } from '../../api/axios.js';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api.get('/api/products').then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/api/products/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Products</h1>
          <p className="mt-1 text-sm text-stone">{products.length} products</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">+ Add Product</Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-stone/20 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone/20 text-xs uppercase tracking-widest text-stone">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-stone">Loading…</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-b border-stone/10">
                  <td className="px-4 py-3">
                    <img src={imageUrl(p.image)} alt={p.name} className="h-14 w-12 object-cover" />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">${p.price}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/products/${p._id}/edit`} className="text-ink underline">Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="ml-4 text-red-600 underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
