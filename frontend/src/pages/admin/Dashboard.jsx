import { useEffect, useState } from 'react';
import api from '../../api/axios.js';

function StatCard({ label, value }) {
  return (
    <div className="border border-stone/20 bg-white p-6">
      <p className="text-xs uppercase tracking-widest text-stone">{label}</p>
      <p className="mt-3 font-serif text-4xl">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/api/products').then(({ data }) => setProducts(data));
    api.get('/api/orders').then(({ data }) => setOrders(data)).catch(() => {});
  }, []);

  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-stone">Overview of your store</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Revenue" value={`$${revenue.toLocaleString()}`} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl">Recent Orders</h2>
        <div className="mt-4 overflow-x-auto border border-stone/20 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone/20 text-xs uppercase tracking-widest text-stone">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o._id} className="border-b border-stone/10">
                  <td className="px-4 py-3">{o.customer?.name}</td>
                  <td className="px-4 py-3">{o.items?.length}</td>
                  <td className="px-4 py-3">${o.total}</td>
                  <td className="px-4 py-3">{o.status}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-stone">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
