import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.233:3333'
});

// 10.0.2.2 (Adndoid Studio)
// 10.0.3.2

export default api;