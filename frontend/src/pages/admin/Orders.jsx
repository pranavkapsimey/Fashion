import { useEffect, useState } from 'react';
import api from '../../api/axios.js';

const statuses = ['Pending', 'Shipped', 'Delivered'];

const statusStyle = {
  Pending: 'bg-amber-100 text-amber-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/orders').then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  async function changeStatus(id, status) {
    const { data } = await api.patch(`/api/orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
  }

  return (
    <div>
      <h1 className="text-3xl">Orders</h1>
      <p className="mt-1 text-sm text-stone">{orders.length} orders</p>

      <div className="mt-8 overflow-x-auto border border-stone/20 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone/20 text-xs uppercase tracking-widest text-stone">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-stone">Loading…</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-stone">No orders yet</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-b border-stone/10 align-top">
                  <td className="px-4 py-3 font-mono text-xs">#{o._id.slice(-6)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{o.customer?.name}</p>
                    <p className="text-xs text-stone">{o.customer?.address}</p>
                  </td>
                  <td className="px-4 py-3">
                    {o.items?.map((i, idx) => (
                      <p key={idx} className="text-xs">
                        {i.name} {i.size && `(${i.size})`} × {i.quantity}
                      </p>
                    ))}
                  </td>
                  <td className="px-4 py-3">${o.total}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o._id, e.target.value)}
                      className="border border-stone/40 bg-white px-2 py-1 text-xs focus:outline-none"
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
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
