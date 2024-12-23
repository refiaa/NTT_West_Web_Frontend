import { useState, useCallback } from 'react';
import { authApi } from '../api/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = useCallback(async (credentials, isLogin = true) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await (isLogin ?
                authApi.login(credentials) :
                authApi.register(credentials));

            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                (isLogin ?
                    'ログインに失敗しました。' :
                    'アカウント登録に失敗しました。');
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        handleAuth
    };
};