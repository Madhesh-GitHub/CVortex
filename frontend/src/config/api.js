const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://your-render-app.onrender.com');

export default API_BASE_URL;