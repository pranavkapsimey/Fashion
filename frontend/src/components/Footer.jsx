import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone/20 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h4 className="text-xl tracking-[0.2em]">MAISON</h4>
          <p className="mt-3 text-sm text-stone">
            Timeless pieces, considered craftsmanship.
          </p>
        </div>
        <div>
          <p className="label">Shop</p>
          <ul className="space-y-2 text-sm text-stone">
            <li><Link to="/shop?category=Women">Women</Link></li>
            <li><Link to="/shop?category=Men">Men</Link></li>
            <li><Link to="/shop?category=Kids">Kids</Link></li>
            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">Company</p>
          <ul className="space-y-2 text-sm text-stone">
            <li>About</li>
            <li>Sustainability</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <p className="label">Admin</p>
          <ul className="space-y-2 text-sm text-stone">
            <li><Link to="/admin/login">Admin Panel</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone/20 py-6 text-center text-xs text-stone">
        © {new Date().getFullYear()} Maison. All rights reserved.
      </div>
    </footer>
  );
}
