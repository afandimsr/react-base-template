import type { IUserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

import type { UserDTO } from '../../application/user/GetUsersUseCase/types/UserDTO';
import { apiClient } from '../apiClient';
import type { CreateUserRequest } from '../../application/user/Create/CreateUserRequest';
import type { ChangePasswordRequest } from '../../application/user/ChangePassword/ChangePasswordRequest';

// MOCK DATA
// const MOCK_USERS: User[] = [
//     { id: '1', name: 'admin', email: 'admin@example.com', roles: ['ADMIN'], isActive: true },
//     { id: '2', name: 'user1', email: 'user1@example.com', roles: ['USER'], isActive: true },
//     { id: '3', name: 'karyawan', email: 'karyawan@example.com', roles: ['USER'], isActive: false },
// ];

export class UserRepositoryImpl implements IUserRepository {

    // MOCK DATA STORAGE
    // private users: User[] = [...MOCK_USERS];

    async getUsers(): Promise<UserDTO[]> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // MOCK IMPLEMENTATION
        // return [...this.users];

        const response = await apiClient.get<UserDTO[]>('/users');
        return response;

    }

    async createUser(userData: Omit<CreateUserRequest, 'id'>): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // MOCK IMPLEMENTATION
        // const newUser: User = {
        //     ...userData,
        //     id: Math.random().toString(36).substr(2, 9),
        // };
        // this.users.push(newUser);
        // return newUser;

        // REAL IMPLEMENTATION
        try {
            const created = await apiClient.post<User>('/users', userData);
            return created;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to create user: ${message}`);
        }
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // MOCK IMPLEMENTATION
        // const index = this.users.findIndex((u) => u.id === id);
        // if (index === -1) throw new Error('User not found');

        // this.users[index] = { ...this.users[index], ...userData };
        // return this.users[index];

        // REAL IMPLEMENTATION
        try {
            const updated = await apiClient.put<User>(`/users/${id}`, userData);
            return updated;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to update user: ${message}`);
        }

    }

    async deleteUser(id: string): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // MOCK IMPLEMENTATION
        // this.users = this.users.filter((u) => u.id !== id);

        // REAL IMPLEMENTATION
        try {
            await apiClient.delete<void>(`/users/${id}`);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to delete user: ${message}`);
        }
    }

    async changePassword(id: string, request: ChangePasswordRequest): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // REAL IMPLEMENTATION
        try {
            await apiClient.put(`/users/${id}/change-password`, request);
        } catch (error: unknown) {
            if (error instanceof Error) throw error;
            throw new Error(`Failed to change password: ${String(error)}`);
        }
    }
}
