import type { IUserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

import { config } from '../../app/config';

const MOCK_USERS: User[] = [
    { id: '1', username: 'admin', email: 'admin@example.com', role: 'ADMIN', isActive: true },
    { id: '2', username: 'user1', email: 'user1@example.com', role: 'USER', isActive: true },
    { id: '3', username: 'karyawan', email: 'karyawan@example.com', role: 'USER', isActive: false },
];

export class UserRepositoryImpl implements IUserRepository {
    private users: User[] = [...MOCK_USERS];
    private apiUrl = config.API_URL;

    async getUsers(): Promise<User[]> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [...this.users];
    }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newUser: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
        };
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) throw new Error('User not found');

        this.users[index] = { ...this.users[index], ...userData };
        return this.users[index];
    }

    async deleteUser(id: string): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.users = this.users.filter((u) => u.id !== id);
    }
}
