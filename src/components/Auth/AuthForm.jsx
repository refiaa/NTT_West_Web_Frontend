import { Visibility, VisibilityOff } from '@mui/icons-material';
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
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!isEmailValid(formData.email)) {
        setError('有効なメールアドレスを入力してください。');
        return;
      }

      if (!isPasswordValid(formData.password)) {
        setError('パスワードは8文字以上で、英数字と特殊文字を含める必要があります。');
        return;
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('パスワードが一致しません。');
        return;
      }

      // TODO: API HERE
      console.log('Form submitted:', formData);

      navigate('/');
    } catch (err) {
      setError('エラーが発生しました。もう一度お試しください。');
      console.error('Auth error:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

          {error && (
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
              {error}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#86868B' }}
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#007AFF',
                '&:hover': {
                  backgroundColor: '#47A1FF',
                },
              }}
            >
              {isLogin ? 'ログイン' : '登録'}
            </Button>

            <Box textAlign="center">
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsLogin(!isLogin)}
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
