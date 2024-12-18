import { Add as AddIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  return (
      <AppBar position="sticky">
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', margin: '0 auto' }}>
          <Typography
              variant="h6"
              component="div"
              onClick={() => navigate('/dashboard')}
              sx={{
                flexGrow: 1,
                color: '#1D1D1F',
                fontWeight: 600,
                cursor: 'pointer',
              }}
          >
            イベント作成ツール
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {location.pathname !== '/create-event' && (
                <Button
                    startIcon={<AddIcon />}
                    onClick={handleCreateEvent}
                    sx={{
                      color: '#007AFF',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                      },
                    }}
                >
                  イベント作成
                </Button>
            )}

            <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#007AFF',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                  },
                }}
            >
              ユーザー登録
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
  );
};

export default Header;