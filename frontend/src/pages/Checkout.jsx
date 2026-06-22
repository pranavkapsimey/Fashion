import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/api/orders', {
        customer: { name: form.name, email: form.email, address: form.address },
        items: items.map((i) => ({
          product: i.productId,
          name: i.name,
          price: i.price,
          size: i.size,
          quantity: i.quantity,
        })),
        total: subtotal,
      });
      clearCart();
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl">Thank You</h1>
        <p className="mt-4 text-stone">
          Your order has been placed. A confirmation will be sent shortly.
        </p>
        <Link to="/shop" className="btn-primary mt-8">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl">Checkout</h1>
        <p className="mt-4 text-stone">Your cart is empty.</p>
        <Link to="/shop" className="btn-primary mt-8">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl">Checkout</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl">Shipping Details</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="label">Full Name</label>
                <input name="name" required value={form.name} onChange={update} className="input" />
              </div>
              <div>
                <label className="label">Email</label>
                <input name="email" type="email" value={form.email} onChange={update} className="input" />
              </div>
              <div>
                <label className="label">Address</label>
                <textarea name="address" required value={form.address} onChange={update} rows="3" className="input" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl">Payment</h2>
            <p className="mt-1 text-xs text-stone">Demo only — no real payment is processed.</p>
            <div className="mt-4">
              <label className="label">Card Number</label>
              <input
                name="card"
                value={form.card}
                onChange={update}
                placeholder="4242 4242 4242 4242"
                className="input"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Placing Order…' : `Place Order — $${subtotal}`}
          </button>
        </form>

        {/* Summary */}
        <aside className="h-fit border border-stone/20 bg-white p-6">
          <h2 className="text-xl">Your Order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between">
                <span className="text-stone">
                  {i.name} {i.size && `(${i.size})`} × {i.quantity}
                </span>
                <span>${i.price * i.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-stone/20 pt-4 text-base">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
