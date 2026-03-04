import axios from 'axios';
import store from '../store';
import { logout } from '../store/reducers/user';

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

request.interceptors.request.use((config) => {
  const { token } = store.getState().user;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(logout());
      window.location.hash = '#/login';
    }
    return Promise.reject(err.response?.data || err);
  }
);

export default request;
