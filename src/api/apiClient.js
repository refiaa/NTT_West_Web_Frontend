import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        this.setupInterceptors();
    }

    setupInterceptors() {
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response.data,
            (error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 403) {
                        localStorage.removeItem('accessToken');
                        window.location.href = '/login';
                    }
                }
                throw this.handleError(error);
            }
        );
    }

    handleError(error) {
        if (error.response) {
            const { data } = error.response;
            const message = data.message || 'エラーが発生しました。';
            return new Error(message);
        }
        return error;
    }

    async request(options) {
        try {
            return await this.client(options);
        } catch (error) {
            throw error;
        }
    }
}

export const apiClient = new ApiClient();