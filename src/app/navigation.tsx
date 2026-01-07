import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

export interface NavItem {
    text: string;
    icon: React.ReactNode;
    path?: string;
    children?: NavItem[];
    roles?: string[];
}

export const menuItems: NavItem[] = [
    {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard'
    },
    {
        text: 'Users',
        icon: <PeopleIcon />,
        path: '/users'
    },
    {
        text: 'Settings',
        icon: <SettingsIcon />,
        children: [
            {
                text: 'Profile',
                icon: <PersonIcon />,
                path: '/profile'
            },
            {
                text: 'Notifications',
                icon: <NotificationsIcon />,
                path: '/settings/notifications'
            }
        ]
    }
];
