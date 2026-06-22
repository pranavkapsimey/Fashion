import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-bone">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-stone/20 bg-white">
        <div className="border-b border-stone/20 px-6 py-6">
          <Link to="/admin" className="font-serif text-xl tracking-[0.2em]">MAISON</Link>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-stone">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm transition ${
                  isActive ? 'bg-ink text-white' : 'text-ink/70 hover:bg-bone'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-stone/20 p-3">
          <Link to="/" className="block px-3 py-2 text-xs uppercase tracking-widest text-stone hover:text-ink">
            ← View Store
          </Link>
          <button
            onClick={handleLogout}
            className="mt-1 block w-full px-3 py-2 text-left text-xs uppercase tracking-widest text-stone hover:text-ink"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-x-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
