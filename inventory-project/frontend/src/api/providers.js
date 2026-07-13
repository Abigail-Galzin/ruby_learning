import apiClient from './client';

export const productsApi = {
  getAll: () => apiClient.get('/providers'),
  getOne: (id) => apiClient.get(`/providers/${id}`),
  create: (data) => apiClient.post('/providers', data),
  update: (id, data) => apiClient.put(`/providers/${id}`, data),
  delete: (id) => apiClient.delete(`/providers/${id}`),
};
