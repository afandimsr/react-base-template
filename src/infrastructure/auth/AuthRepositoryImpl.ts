import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';
import { tokenStorage } from '../storage/tokenStorage';

import { config } from '../../app/config';

// MOCK DATA
const MOCK_USER: User = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    isActive: true,
};

const MOCK_TOKEN = 'mock-jwt-token-12345';

export class AuthRepositoryImpl implements AuthRepository {
    private apiUrl = config.API_URL;

    async login(username: string, password: string): Promise<{ token: string; user: User }> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (username === 'admin' && password === 'admin') {
            tokenStorage.setToken(MOCK_TOKEN);
            return { token: MOCK_TOKEN, user: MOCK_USER };
        }

        throw new Error('Invalid credentials');
    }

    async logout(): Promise<void> {
        tokenStorage.clearToken();
    }

    async getUser(): Promise<User | null> {
        const token = tokenStorage.getToken();
        if (!token) return null;
        // Simulate validation
        return MOCK_USER;
    }
}
