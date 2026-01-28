import { create } from 'zustand';
import type { User } from '../domain/entities/User';
import { AuthRepositoryImpl } from '../infrastructure/auth/AuthRepositoryImpl';
import { LoginUseCase } from '../application/auth/LoginUseCase';
import { tokenStorage } from '../infrastructure/storage/tokenStorage';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    initializeAuth: () => Promise<void>;
}

// Dependency Injection (simple version)
const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
    error: null,

    initializeAuth: async () => {
        const token = tokenStorage.getToken();
        if (token) {
            try {
                const user = await authRepository.getUser();
                if (user) {
                    set({ user, token, isAuthenticated: true, isInitialized: true });
                } else {
                    tokenStorage.clearToken();
                    set({ user: null, token: null, isAuthenticated: false, isInitialized: true });
                }
            } catch (err) {
                tokenStorage.clearToken();
                set({ user: null, token: null, isAuthenticated: false, isInitialized: true });
            }
        } else {
            set({ isInitialized: true });
        }
    },

    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            const { user, token } = await loginUseCase.execute(username, password);
            set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
            set({ error: err.message || 'Login failed', isLoading: false });
            throw err;
        }
    },

    logout: () => {
        authRepository.logout();
        set({ user: null, token: null, isAuthenticated: false });
        // Redirect to backend logout to clear Keycloak SSO session
        window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
    },
}));

// Initialize auth state on app load
useAuthStore.getState().initializeAuth();
