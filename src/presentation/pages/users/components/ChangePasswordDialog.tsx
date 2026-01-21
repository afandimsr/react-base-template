import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    InputAdornment,
    Typography,
    Box,
    LinearProgress,
} from '@mui/material';
import { ApiError } from '../../../../infrastructure/apiClient';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { User } from '../../../../domain/entities/User';

interface ChangePasswordDialogProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onConfirm: (password: string, confirmation: string) => Promise<void>;
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
    open,
    user,
    onClose,
    onConfirm,
}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setPassword('');
            setConfirmPassword('');
            setError('');
            setFieldErrors({});
            setLoading(false);
        }
    }, [open]);

    const generatePassword = () => {
        const length = 16;
        const charset = {
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lower: 'abcdefghijklmnopqrstuvwxyz',
            number: '0123456789',
            special: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        };

        let result = '';
        // Ensure at least one of each type
        result += charset.upper[Math.floor(Math.random() * charset.upper.length)];
        result += charset.lower[Math.floor(Math.random() * charset.lower.length)];
        result += charset.number[Math.floor(Math.random() * charset.number.length)];
        result += charset.special[Math.floor(Math.random() * charset.special.length)];

        const allChars = charset.upper + charset.lower + charset.number + charset.special;
        for (let i = 4; i < length; i++) {
            result += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle characters
        result = result.split('').sort(() => 0.5 - Math.random()).join('');

        setPassword(result);
        setConfirmPassword(result);
        setShowPassword(true);
    };

    const calculateStrength = (pwd: string) => {
        let strength = 0;
        if (pwd.length >= 8) strength += 20;
        if (pwd.length >= 12) strength += 20;
        if (/[A-Z]/.test(pwd)) strength += 20;
        if (/[0-9]/.test(pwd)) strength += 20;
        if (/[^A-Za-z0-9]/.test(pwd)) strength += 20;
        return strength;
    };

    const getStrengthColor = (strength: number) => {
        if (strength <= 40) return 'error';
        if (strength <= 60) return 'warning';
        if (strength <= 80) return 'info';
        return 'success';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (calculateStrength(password) < 60) {
            setError('Password is too weak. Use a mix of uppercase, lowercase, numbers, and symbols.');
            return;
        }

        setLoading(true);
        try {
            await onConfirm(password, confirmPassword);
            onClose();
        } catch (err: any) {
            if (err instanceof ApiError && err.data?.errors) {
                setFieldErrors(err.data.errors);
                setError(err.message || 'Validation failed');
            } else {
                setError(err.message || 'Failed to change password');
            }
        } finally {
            setLoading(false);
        }
    };

    const strength = calculateStrength(password);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    Change Password
                    <Typography variant="subtitle2" color="text.secondary" component="span" display="block">
                        For user: {user?.name}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            margin="normal"
                            autoComplete="new-password"
                            error={!!fieldErrors.new_password}
                            helperText={fieldErrors.new_password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {password && (
                            <Box sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="caption">Strength</Typography>
                                    <Typography variant="caption" color={`${getStrengthColor(strength)}.main`}>
                                        {strength <= 40 ? 'Weak' : strength <= 60 ? 'Fair' : strength <= 80 ? 'Good' : 'Strong'}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={strength}
                                    color={getStrengthColor(strength)}
                                    sx={{ height: 4, borderRadius: 2 }}
                                />
                            </Box>
                        )}
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            margin="normal"
                            error={(!!error && password !== confirmPassword) || !!fieldErrors.confirm_password}
                            helperText={password !== confirmPassword ? 'Passwords do not match' : fieldErrors.confirm_password || ''}
                        />
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={generatePassword}
                            size="small"
                            sx={{ mt: 1 }}
                        >
                            Generate Secure Password
                        </Button>
                    </Box>

                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit" disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !password || password !== confirmPassword || calculateStrength(password) < 60}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
