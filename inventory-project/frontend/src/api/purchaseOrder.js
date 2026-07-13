import apiClient from './client';

export const productsApi = {
  getAll: () => apiClient.get('/purchase_orders'),
  getOne: (id) => apiClient.get(`/purchase_orders/${id}`),
  create: (data) => apiClient.post('/purchase_orders', data),
  update: (id, data) => apiClient.put(`/purchase_orders/${id}`, data),
  delete: (id) => apiClient.delete(`/purchase_orders/${id}`),
};
