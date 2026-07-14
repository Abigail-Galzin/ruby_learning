import apiClient from './client';

export const productsApi = {
  getAll: () => apiClient.get('/products'),
  getOne: (id) => apiClient.get(`/products/${id}`),
  getCategories: () => apiClient.get('/products/categories'),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),

  getByProvider: (providerId) => apiClient.get(`/providers/${providerId}/products`),
};
