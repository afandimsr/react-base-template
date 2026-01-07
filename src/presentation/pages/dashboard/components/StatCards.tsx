import React from 'react';
import { Grid, Card, Box, Typography, alpha, Skeleton, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DevicesIcon from '@mui/icons-material/Devices';

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
    color: string;
    isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color, isLoading }) => {
    const theme = useTheme();

    if (isLoading) {
        return (
            <Card sx={{ p: 3, borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Skeleton variant="circular" width={48} height={48} />
                    <Skeleton variant="text" width={40} />
                </Box>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="40%" />
            </Card>
        );
    }

    return (
        <Card sx={{
            p: 3,
            borderRadius: 4,
            height: '100%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translateY(-5px)',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
            }
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: alpha(color, 0.1),
                    color: color,
                    display: 'flex'
                }}>
                    {icon}
                </Box>
                <Typography variant="caption" sx={{
                    color: theme.palette.success.main,
                    fontWeight: 700,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    px: 1,
                    py: 0.5,
                    borderRadius: 1.5
                }}>
                    {trend}
                </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {title}
            </Typography>
        </Card>
    );
};

export const StatCards: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const stats = [
        { title: 'Total Users', value: '2,845', trend: '+12%', icon: <PeopleIcon />, color: '#1976d2' },
        { title: 'Monthly Revenue', value: '$45,280', trend: '+8%', icon: <AccountBalanceWalletIcon />, color: '#9c27b0' },
        { title: 'Conversion Rate', value: '4.2%', trend: '+3%', icon: <TrendingUpIcon />, color: '#ed6c02' },
        { title: 'Active Devices', value: '1,120', trend: '+15%', icon: <DevicesIcon />, color: '#2e7d32' },
    ];

    return (
        <Grid container spacing={3}>
            {stats.map((stat, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard {...stat} isLoading={isLoading} />
                </Grid>
            ))}
        </Grid>
    );
};
