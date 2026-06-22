import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { imageUrl } from '../api/axios.js';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl">Your Cart</h1>
        <p className="mt-4 text-stone">Your cart is currently empty.</p>
        <Link to="/shop" className="btn-primary mt-8">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl">Your Cart</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="divide-y divide-stone/20 border-y border-stone/20">
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 py-6">
              <img src={imageUrl(item.image)} alt={item.name} className="h-32 w-24 object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    {item.size && <p className="mt-1 text-sm text-stone">Size: {item.size}</p>}
                  </div>
                  <p className="text-sm">${item.price * item.quantity}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-stone/40">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="px-3 py-1">−</button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="px-3 py-1">+</button>
                  </div>
                  <button onClick={() => removeItem(item.key)} className="text-xs uppercase tracking-widest text-stone hover:text-ink">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-fit border border-stone/20 bg-white p-6">
          <h2 className="text-xl">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-stone">Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-stone/20 pt-3 text-base">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary mt-6 w-full">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
