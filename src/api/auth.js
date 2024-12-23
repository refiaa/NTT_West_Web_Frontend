import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';

export const authApi = {
    async login(credentials) {
        const response = await apiClient.request({
            method: 'POST',
            url: API_ENDPOINTS.AUTH.LOGIN,
            data: credentials,
        });

        if (response.accessToken && response.refreshToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
    },

    async register(userData) {
        const response = await apiClient.request({
            method: 'POST',
            url: API_ENDPOINTS.AUTH.REGISTER,
            data: userData,
        });

        if (response.accessToken && response.refreshToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response;
    },

    async logout() {
        try {
            await apiClient.request({
                method: 'POST',
                url: API_ENDPOINTS.AUTH.LOGOUT,
            });
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
};