import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Typography,
    alpha,
} from '@mui/material';
import { useUserStore } from '../../../state/userStore';
import { UserFormDialog } from './UserFormDialog';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import type { User } from '../../../domain/entities/User';

// New Modular Components
import { UserTableHeader } from './components/UserTableHeader';
import { UserTableActions } from './components/UserTableActions';
import { UserTableSkeleton } from './components/UserTableSkeleton';

export const UserListPage: React.FC = () => {
    const { users, isLoading, fetchUsers, addUser, editUser, removeUser } = useUserStore();
    const [openForm, setOpenForm] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    const handleCreate = () => {
        setSelectedUser(null);
        setOpenForm(true);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setOpenForm(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setOpenConfirm(true);
    };

    const handleSave = async (data: any) => {
        if (selectedUser) {
            await editUser(selectedUser.id, data);
        } else {
            await addUser(data);
        }
        setOpenForm(false);
    };

    const handleConfirmDelete = async () => {
        if (selectedUser) {
            await removeUser(selectedUser.id);
        }
        setOpenConfirm(false);
    };

    if (isLoading && users.length === 0) {
        return (
            <Box sx={{ p: 4 }}>
                <UserTableHeader
                    onAddClick={handleCreate}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <UserTableSkeleton />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', p: { xs: 2, md: 4 } }}>
            <UserTableHeader
                onAddClick={handleCreate}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: (theme) => alpha(theme.palette.action.hover, 0.5) }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email Address</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02) },
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {user.username}
                                    </Typography>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'ADMIN' ? 'primary' : 'default'}
                                        size="small"
                                        variant={user.role === 'ADMIN' ? 'filled' : 'outlined'}
                                        sx={{ borderRadius: 1.5, fontSize: '0.75rem', fontWeight: 600 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.isActive ? 'Active' : 'Inactive'}
                                        color={user.isActive ? 'success' : 'error'}
                                        size="small"
                                        sx={{
                                            borderRadius: 1.5,
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            bgcolor: (theme) => alpha(user.isActive ? theme.palette.success.main : theme.palette.error.main, 0.1),
                                            color: (theme) => user.isActive ? theme.palette.success.main : theme.palette.error.main,
                                            border: 'none'
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <UserTableActions
                                        user={user}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No users found matching your search criteria.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <UserFormDialog
                open={openForm}
                user={selectedUser}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={openConfirm}
                title="Delete User"
                message={`Are you sure you want to delete account "${selectedUser?.username}"? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setOpenConfirm(false)}
            />
        </Box>
    );
};

