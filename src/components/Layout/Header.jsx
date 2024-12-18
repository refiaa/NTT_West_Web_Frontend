import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ maxWidth: 'lg', width: '100%', margin: '0 auto' }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        color: '#1D1D1F',
                        fontWeight: 600
                    }}
                >
                    イベント作成ツール
                </Typography>
                <Box>
                    <Button
                        onClick={() => navigate('/login')}
                        sx={{
                            color: '#007AFF',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 122, 255, 0.1)'
                            }
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