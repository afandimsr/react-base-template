import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
} from '@mui/material';
import type { User } from '../../../domain/entities/User';

interface UserFormDialogProps {
    open: boolean;
    user?: User | null;
    onClose: () => void;
    onSave: (user: Omit<User, 'id'> | Partial<User>) => void;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
    open,
    user,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        roles: [] as string[],
        isActive: true,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password : '',
                roles: user.roles || [],
                isActive: user.isActive,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                password : '',
                roles: [],
                isActive: true,
            });
        }
    }, [user, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        label="Full Name"
                        margin="normal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formData.roles[0] || ''}
                            label="Role"
                            onChange={(e) => setFormData({ ...formData, roles: [e.target.value] })}
                        >
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="USER">User</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            />
                        }
                        label="Active Status"
                        sx={{ mt: 2 }}
                    />

                     {!user && (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                            Password will be auto-generated from email (e.g., user@example.com → user123)
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
