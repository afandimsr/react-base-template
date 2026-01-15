import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';
import { tokenStorage } from '../storage/tokenStorage';
import { apiClient } from '../apiClient';
import { safeDecodeJwt } from './jwt.service';
import { mapJwtToUser } from '../../application/auth/Mapper/AuthMapper';

// MOCK DATA
// const MOCK_USER: User = {
//     id: '1',
//     name: 'admin',
//     email: 'admin@example.com',
//     roles: ['ADMIN'],
//     isActive: true,
// };

// MOCK TOKEN
// const MOCK_TOKEN = 'mock-jwt-token-12345';

export class AuthRepositoryImpl implements AuthRepository {

    async login(username: string, password: string): Promise<{ token: string; user: User }> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock authentication logic
        // if (username === 'admin' && password === 'admin') {
        //     tokenStorage.setToken(MOCK_TOKEN);
        //     return { token: MOCK_TOKEN, user: MOCK_USER };
        // }

        // throw new Error('Invalid credentials');

        const response = await apiClient.post<{ token: string; }>('/login', {
            email: username, // Backend uses email for login
            password: password
        });

        if (!response?.token) {
            throw new Error("Login failed: token not returned");
        }

        const payload = safeDecodeJwt(response.token);  
        if (!payload) {
            throw new Error("Login failed: invalid token");
        }
        const user = mapJwtToUser(payload);

        tokenStorage.setToken(response.token);
        return { token: response.token, user: user };
    }

    async logout(): Promise<void> {
        tokenStorage.clearToken();
    }

    async getUser(): Promise<User | null> {
        const token = tokenStorage.getToken();
        if (!token) return null;

        try {
            // Suggesting a /me endpoint or similar for profile retrieval
            // For now, if we have a token, we consider the user authenticated
            // and we could fetch details from /users/:id if we knew it, 
            // but let's assume /users/me or similar exists or we just return a partial user
            // In a real app, you'd fetch the user profile here.

            const payload = safeDecodeJwt(token);
            if (!payload) {
                throw new Error("Login failed: invalid token");
            }
            const user = mapJwtToUser(payload);

            return user;
        } catch (err) {
            return null;
        }
    }
}
