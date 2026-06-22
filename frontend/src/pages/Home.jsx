import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import ProductCard from '../components/ProductCard.jsx';

const collections = [
  { label: 'Women', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80' },
  { label: 'Men', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80' },
  { label: 'Accessories', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=600&q=80' },
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/api/products').then(({ data }) => setProducts(data));
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[480px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
          alt="Maison collection"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-xs uppercase tracking-[0.4em]">Spring / Summer 2026</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">
            Quiet Luxury, Considered Design
          </h1>
          <Link to="/shop" className="mt-8 border border-white px-8 py-3 text-sm uppercase tracking-widest transition hover:bg-white hover:text-ink">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* Featured collections */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl">Featured Collections</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((c) => (
            <Link key={c.label} to={`/shop?category=${c.label}`} className="group relative block aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={c.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-6">
                <span className="font-serif text-2xl text-white">{c.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="mb-10 text-center text-3xl">Editor's Picks</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl">New Arrivals</h2>
          <Link to="/shop" className="text-xs uppercase tracking-widest text-stone hover:text-ink">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
