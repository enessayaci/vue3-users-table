// src/services/apiService.ts
import type { User } from '@/types/requests/User';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// API istemcisi
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://66f5d2ad436827ced9753aaa.mockapi.io/api', // API'nizin temel URL'si
  timeout: 10000, // İsteğin zaman aşım süresi (isteğe bağlı)
});

// API servisi
const apiService = {
  // Genel get metodu
  get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return response.data;
  },

  // Genel post metodu
  post: async <T>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return response.data;
  },

  // Genel put metodu
  put: async <T>(url: string, data: any): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data);
    return response.data;
  },

  // Genel delete metodu
  delete: async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url);
    return response.data;
  },

  // Özel getUsers metodu
  getUsers: async (): Promise<User[]> => {
    return apiService.get<User[]>('/users'); // API'den kullanıcıları al
  },

  // Özel getUserById metodu
  getUserById: async (userId: string): Promise<User> => {
    return apiService.get<User>(`/users/${userId}`); // ID'ye göre kullanıcı al
  },

  // Özel addUser metodu
  addUser: async (user: Omit<User, 'id'>): Promise<User> => {
    return apiService.post<User>('/users', user); // Kullanıcı ekle
  },

  // Özel updateUser metodu
  updateUser: async (user: User): Promise<User> => {
    return apiService.put<User>(`/users/${user.id}`, user); // Kullanıcı güncelle
  },

  // Özel deleteUser metodu
  deleteUser: async (userId: string): Promise<User> => {
    return apiService.delete(`/users/${userId}`); // Kullanıcı sil
  },
};

export default apiService;
