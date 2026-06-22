import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { imageUrl } from '../../api/axios.js';

const categories = ['Men', 'Women', 'Kids', 'Accessories'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
const empty = { name: '', description: '', price: '', category: 'Women', stock: '', featured: false };

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(empty);
  const [sizes, setSizes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/api/products/${id}`).then(({ data }) => {
      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
        featured: data.featured,
      });
      setSizes(data.sizes || []);
      setExistingImage(data.image);
    });
  }, [id, isEdit]);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleSize = (s) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    fd.append('price', form.price);
    fd.append('category', form.category);
    fd.append('stock', form.stock);
    fd.append('featured', form.featured);
    fd.append('sizes', JSON.stringify(sizes));
    if (imageFile) fd.append('image', imageFile);

    try {
      if (isEdit) {
        await api.put(`/api/products/${id}`, fd);
      } else {
        await api.post('/api/products', fd);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  }

  const preview = imageFile ? URL.createObjectURL(imageFile) : existingImage ? imageUrl(existingImage) : null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 border border-stone/20 bg-white p-8">
        <div>
          <label className="label">Name</label>
          <input name="name" required value={form.name} onChange={update} className="input" />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea name="description" rows="3" value={form.description} onChange={update} className="input" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="label">Price ($)</label>
            <input name="price" type="number" min="0" required value={form.price} onChange={update} className="input" />
          </div>
          <div>
            <label className="label">Stock</label>
            <input name="stock" type="number" min="0" required value={form.stock} onChange={update} className="input" />
          </div>
        </div>

        <div>
          <label className="label">Category</label>
          <select name="category" value={form.category} onChange={update} className="input">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Sizes</label>
          <div className="flex flex-wrap gap-3">
            {sizeOptions.map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={sizes.includes(s)} onChange={() => toggleSize(s)} className="accent-ink" />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" name="featured" checked={form.featured} onChange={update} className="accent-ink" />
            Featured product
          </label>
        </div>

        <div>
          <label className="label">Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="text-sm" />
          {preview && <img src={preview} alt="preview" className="mt-3 h-40 w-32 object-cover" />}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
