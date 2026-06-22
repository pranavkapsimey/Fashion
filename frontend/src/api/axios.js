import axios from 'axios';

// Base URL is empty so requests hit the Vite proxy (/api -> backend) in dev.
// In production set VITE_API_URL to the deployed backend origin.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

// Attach the admin JWT to every request if present.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// Resolve a product image path to a usable URL.
// Seed products use absolute http URLs; uploaded ones use relative /uploads paths.
export function imageUrl(image) {
  if (!image) return 'https://via.placeholder.com/600x800?text=No+Image';
  if (image.startsWith('http')) return image;
  const base = import.meta.env.VITE_API_URL || '';
  return `${base}${image}`;
}
