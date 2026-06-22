import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios.js';
import ProductCard from '../components/ProductCard.jsx';

const categories = ['All', 'Women', 'Men', 'Kids', 'Accessories'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || 'All';
  const [maxPrice, setMaxPrice] = useState(500);
  const [activeSizes, setActiveSizes] = useState([]);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    setLoading(true);
    const query = category && category !== 'All' ? `?category=${category}` : '';
    api.get(`/api/products${query}`).then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  }, [category]);

  function setCategory(c) {
    const next = new URLSearchParams(searchParams);
    if (c === 'All') next.delete('category');
    else next.set('category', c);
    setSearchParams(next);
  }

  function toggleSize(s) {
    setActiveSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  const visible = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (activeSizes.length > 0) {
      list = list.filter((p) => p.sizes?.some((s) => activeSizes.includes(s)));
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, maxPrice, activeSizes, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl">{category === 'All' ? 'Shop All' : category}</h1>
      <p className="mt-2 text-sm text-stone">{visible.length} pieces</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <p className="label">Category</p>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCategory(c)}
                    className={`text-sm ${category === c ? 'text-ink underline' : 'text-stone hover:text-ink'}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Max Price: ${maxPrice}</p>
            <input
              type="range" min="50" max="500" step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-ink"
            />
          </div>

          <div>
            <p className="label">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`h-9 w-9 border text-xs ${
                    activeSizes.includes(s) ? 'border-ink bg-ink text-white' : 'border-stone/40 text-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-6 flex justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-stone/40 bg-white px-3 py-2 text-sm focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <p className="text-stone">Loading…</p>
          ) : visible.length === 0 ? (
            <p className="text-stone">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {visible.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
