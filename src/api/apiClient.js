import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    setupInterceptors() {
        this.client.interceptors.request.use(
            (config) => {
                if (config.url.includes('/auth/')) {
                    console.group('Auth API Request');
                    console.log('URL:', `${config.baseURL}${config.url}`);
                    console.log('Method:', config.method.toUpperCase());
                    console.log('Headers:', config.headers);

                    const sanitizedData = { ...config.data };
                    if (sanitizedData.password) {
                        sanitizedData.password = '********';
                    }
                    console.log('Request Data:', sanitizedData);

                    console.groupEnd();
                }
                return config;
            },
            (error) => {
                console.error('Auth Request Error:', error);
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response) => {
                if (response.config.url.includes('/auth/')) {
                    console.group('Auth API Response');
                    console.log('URL:', `${response.config.baseURL}${response.config.url}`);
                    console.log('Status:', response.status);

                    const sanitizedResponse = { ...response.data };
                    if (sanitizedResponse.accessToken) {
                        sanitizedResponse.accessToken = sanitizedResponse.accessToken.substring(0, 10) + '...';
                    }
                    if (sanitizedResponse.refreshToken) {
                        sanitizedResponse.refreshToken = sanitizedResponse.refreshToken.substring(0, 10) + '...';
                    }

                    console.log('Response Data:', sanitizedResponse);
                    console.groupEnd();
                }
                return response;
            },
            (error) => {
                if (error.config?.url.includes('/auth/')) {
                    console.group('Auth API Error');
                    console.log('URL:', error.config?.url);
                    console.log('Status:', error.response?.status);
                    console.log('Error Data:', error.response?.data);
                    console.log('Error Message:', error.message);
                    console.groupEnd();
                }
                return Promise.reject(error);
            }
        );
    }

    async request(options) {
        try {
            const response = await this.client(options);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    handleError(error) {
        if (error.response) {
            const { status, data } = error.response;
            console.error(`API Error ${status}:`, data);

            if (status === 429) {
                const retryAfter = parseInt(error.response.headers['retry-after'] || '5', 10);
                throw new Error(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
            }
        } else if (error.request) {
            console.error('Network Error:', error.request);
            throw new Error('Network error occurred. Please check your connection.');
        } else {
            console.error('Error:', error.message);
            throw error;
        }
    }
}

export const apiClient = new ApiClient();