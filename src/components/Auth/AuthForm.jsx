import React, { useState, useCallback, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, error: authError, handleAuth } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const redirect = location.state?.from || '/';
            navigate(redirect, { replace: true });
        }
    }, [navigate, location]);

    const validateEmail = useCallback((email) => {
        if (!email) return 'メールアドレスを入力してください。';
        if (!EMAIL_REGEX.test(email)) return '有効なメールアドレスを入力してください。';
        return '';
    }, []);

    const validatePassword = useCallback((password) => {
        if (!password) return 'パスワードを入力してください。';
        if (!PASSWORD_REGEX.test(password)) {
            return 'パスワードは8文字以上で、英数字と特殊文字を含める必要があります。';
        }
        return '';
    }, []);

    const validateConfirmPassword = useCallback((confirmPassword, password) => {
        if (!confirmPassword) return '確認用パスワードを入力してください。';
        if (confirmPassword !== password) return 'パスワードが一致しません。';
        return '';
    }, []);

    const validateUsername = useCallback((username) => {
        if (!username) return 'ユーザー名を入力してください。';
        if (username.length < 3) return 'ユーザー名は3文字以上である必要があります。';
        return '';
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        let error = '';
        switch (name) {
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(value, formData.password);
                break;
            case 'username':
                error = validateUsername(value);
                break;
            default:
                break;
        }

        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, [formData.password, validateEmail, validatePassword, validateConfirmPassword, validateUsername]);

    const validateForm = useCallback(() => {
        const errors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            confirmPassword: !isLogin ? validateConfirmPassword(formData.confirmPassword, formData.password) : '',
            username: !isLogin ? validateUsername(formData.username) : '',
        };

        setFormErrors(errors);

        return !Object.values(errors).some(error => error !== '');
    }, [formData, isLogin, validateEmail, validatePassword, validateConfirmPassword, validateUsername]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        try {
            if (!validateForm()) {
                return;
            }

            const credentials = {
                email: formData.email,
                password: formData.password,
                ...((!isLogin && formData.username) && { username: formData.username })
            };

            console.group('Auth Form Submission');
            console.log('Form Type:', isLogin ? 'Login' : 'Register');
            console.log('Email:', formData.email);
            console.log('Username:', !isLogin ? formData.username : 'N/A');
            console.timeEnd('Auth API Call');

            await handleAuth(credentials, isLogin);

            const redirect = location.state?.from || '/';
            navigate(redirect, { replace: true });

        } catch (err) {
            console.error('Authentication error:', err);
            setValidationError(err.message || 'エラーが発生しました。もう一度お試しください。');
        }
    };

    const switchMode = useCallback(() => {
        setIsLogin(prev => !prev);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
        });
        setFormErrors({
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
        });
        setValidationError('');
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        width: '100%',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        sx={{
                            mb: 3,
                            color: '#1D1D1F',
                            fontWeight: 600,
                        }}
                    >
                        {isLogin ? 'ログイン' : 'アカウント登録'}
                    </Typography>

                    {(validationError || authError) && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                                color: '#FF3B30',
                                '& .MuiAlert-icon': {
                                    color: '#FF3B30',
                                },
                            }}
                        >
                            {validationError || authError}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="ユーザー名"
                                name="username"
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                error={!!formErrors.username}
                                helperText={formErrors.username}
                                disabled={isLoading}
                                sx={{
                                    '& label': { color: '#86868B' },
                                    '& label.Mui-focused': { color: '#007AFF' },
                                }}
                            />
                        )}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="メールアドレス"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            disabled={isLoading}
                            sx={{
                                '& label': { color: '#86868B' },
                                '& label.Mui-focused': { color: '#007AFF' },
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="パスワード"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            disabled={isLoading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: '#86868B' }}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& label': { color: '#86868B' },
                                '& label.Mui-focused': { color: '#007AFF' },
                            }}
                        />

                        {!isLogin && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="パスワード（確認）"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={!!formErrors.confirmPassword}
                                helperText={formErrors.confirmPassword}
                                disabled={isLoading}
                                sx={{
                                    '& label': { color: '#86868B' },
                                    '& label.Mui-focused': { color: '#007AFF' },
                                }}
                            />
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading || Object.values(formErrors).some(error => error !== '')}
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#007AFF',
                                '&:hover': {
                                    backgroundColor: '#47A1FF',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: 'rgba(0, 122, 255, 0.5)',
                                    color: '#FFFFFF',
                                }
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                isLogin ? 'ログイン' : '登録'
                            )}
                        </Button>

                        <Box textAlign="center">
                            <Link
                                component="button"
                                variant="body2"
                                onClick={switchMode}
                                disabled={isLoading}
                                sx={{
                                    color: '#007AFF',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {isLogin
                                    ? 'アカウントをお持ちでない方はこちら'
                                    : 'すでにアカウントをお持ちの方はこちら'}
                            </Link>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default AuthForm;