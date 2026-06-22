import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=Women', label: 'Women' },
  { to: '/shop?category=Men', label: 'Men' },
  { to: '/shop?category=Accessories', label: 'Accessories' },
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone/20 bg-bone/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <Link to="/" className="font-serif text-2xl tracking-[0.3em] sm:text-3xl">
          MAISON
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest transition hover:text-stone ${
                  isActive ? 'text-ink' : 'text-ink/70'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/cart" className="relative text-sm uppercase tracking-widest">
          Cart
          {count > 0 && (
            <span className="absolute -right-4 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-white">
              {count}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-4 border-t border-stone/20 px-6 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest text-ink/70"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
