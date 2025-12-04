import axios from 'axios';

const api = axios.create({
  baseURL:'https://billing-management-system-2.onrender.com/api',
  timeout: 10000,
});

export default api;