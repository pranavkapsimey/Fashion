import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api, { imageUrl } from '../api/axios.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => setError('Product not found'));
  }, [id]);

  if (error) return <div className="p-20 text-center text-stone">{error}</div>;
  if (!product) return <div className="p-20 text-center text-stone">Loading…</div>;

  const needsSize = product.sizes && product.sizes.length > 0;

  function handleAdd() {
    if (needsSize && !size) {
      setError('Please select a size');
      return;
    }
    addItem(product, size);
    setAdded(true);
    setError('');
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/shop" className="text-xs uppercase tracking-widest text-stone hover:text-ink">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-12 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-white">
            <img src={imageUrl(product.image)} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone">{product.category}</p>
          <h1 className="mt-2 text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl">${product.price}</p>

          <p className="mt-6 leading-relaxed text-ink/80">{product.description}</p>

          {needsSize && (
            <div className="mt-8">
              <p className="label">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setError(''); }}
                    className={`h-11 w-11 border text-sm ${
                      size === s ? 'border-ink bg-ink text-white' : 'border-stone/40 hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-sm text-stone">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={handleAdd} disabled={product.stock === 0} className="btn-primary">
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button onClick={() => { handleAdd(); navigate('/cart'); }} disabled={product.stock === 0} className="btn-outline">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
