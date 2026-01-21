import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import type { User } from '../../../../domain/entities/User';

interface UserTableActionsProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    onChangePassword: (user: User) => void;
}

export const UserTableActions: React.FC<UserTableActionsProps> = ({ user, onEdit, onDelete, onChangePassword }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="Change Password">
                <IconButton
                    onClick={() => onChangePassword(user)}
                    size="small"
                    sx={{
                        color: 'info.main',
                        '&:hover': { bgcolor: 'info.lighter' }
                    }}
                >
                    <LockOpenIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit User">
                <IconButton
                    onClick={() => onEdit(user)}
                    size="small"
                    sx={{
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.lighter' }
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete User">
                <IconButton
                    onClick={() => onDelete(user)}
                    size="small"
                    sx={{
                        color: 'error.main',
                        '&:hover': { bgcolor: 'error.lighter' }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};
