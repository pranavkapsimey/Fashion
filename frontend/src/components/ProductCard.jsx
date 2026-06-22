import { Link } from 'react-router-dom';
import { imageUrl } from '../api/axios.js';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-white">
        <img
          src={imageUrl(product.image)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-widest text-stone">{product.category}</p>
        <h3 className="mt-1 font-serif text-lg leading-snug">{product.name}</h3>
        <p className="mt-1 text-sm">${product.price}</p>
      </div>
    </Link>
  );
}
