import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';

export const authApi = {
    async login(credentials) {
        try {
            const response = await apiClient.request({
                method: 'POST',
                url: API_ENDPOINTS.AUTH.LOGIN,
                data: credentials
            });

            if (response.token) {
                localStorage.setItem('accessToken', response.token);
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await apiClient.request({
                method: 'POST',
                url: API_ENDPOINTS.AUTH.REGISTER,
                data: userData
            });

            if (response.token) {
                localStorage.setItem('accessToken', response.token);
            }

            return response;
        } catch (error) {
            throw error;
        }
    }
};