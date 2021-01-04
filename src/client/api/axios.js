import axios from 'axios';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default axios.create({
  baseURL: isDevelopment ? 'http://localhost:3000/api' : '/api',
});
