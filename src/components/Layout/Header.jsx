import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateEvent = () => {
        if (location.pathname !== '/dashboard') {
            navigate('/dashboard');
        }
    };

    const handleTitleClick = () => {
        if (location.pathname !== '/dashboard') {
            navigate('/dashboard');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: 'lg',
                    width: '100%',
                    margin: '0 auto',
                    px: { xs: 2, sm: 3 },
                    minHeight: { xs: 56, sm: 64 }
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    onClick={handleTitleClick}
                    sx={{
                        flexGrow: 1,
                        color: 'text.primary',
                        fontWeight: 600,
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                >
                    イベント作成ツール
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    {location.pathname !== '/dashboard' && (
                        <Button
                            startIcon={<AddIcon />}
                            onClick={handleCreateEvent}
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                                },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                px: { xs: 1.5, sm: 2 },
                            }}
                        >
                            イベント作成
                        </Button>
                    )}

                    <Button
                        onClick={handleLoginClick}
                        sx={{
                            color: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                            },
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            px: { xs: 1.5, sm: 2 },
                        }}
                    >
                        ログイン
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;