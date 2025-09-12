const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://cvortex-backend.onrender.com/');

export default API_BASE_URL;