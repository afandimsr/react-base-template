import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../../state/authStore';
import { tokenStorage } from '../../../infrastructure/storage/tokenStorage';
import { Box, CircularProgress, Typography } from '@mui/material';

export const AuthCallbackPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { initializeAuth } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            tokenStorage.setToken(token);
            initializeAuth().then(() => {
                navigate('/dashboard');
            });
        } else {
            console.error('No token found in URL');
            navigate('/login');
        }
    }, [searchParams, navigate, initializeAuth]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 2
            }}
        >
            <CircularProgress />
            <Typography variant="h6">Completing authentication...</Typography>
        </Box>
    );
};
