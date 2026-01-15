import { create } from 'zustand';
import type { User } from '../domain/entities/User';
import { UserRepositoryImpl } from '../infrastructure/api/user.api';
import { GetUsersUseCase } from '../application/user/GetUsersUseCase/GetUsersUseCase';
import { CreateUserUseCase } from '../application/user/Create/CreateUserUseCase';
import { UpdateUserUseCase } from '../application/user/UpdateUserUseCase';
import { DeleteUserUseCase } from '../application/user/DeleteUserUseCase';

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
    editUser: (id: string, user: Partial<User>) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
}

// Dependency Injection
const userRepo = new UserRepositoryImpl();
const getUsersUseCase = new GetUsersUseCase(userRepo);
const createUserUseCase = new CreateUserUseCase(userRepo);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const deleteUserUseCase = new DeleteUserUseCase(userRepo);

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const users = await getUsersUseCase.execute();

            // mapper from UserDTO to User if needed
            const mappedUsers = users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
                isActive: user.is_active
            }));

            set({ users: mappedUsers, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    addUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            await createUserUseCase.execute(userData);
            await get().fetchUsers(); // Refresh list
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            throw err;
        }
    },

    editUser: async (id, userData) => {
        set({ isLoading: true, error: null });
        try {
            await updateUserUseCase.execute(id, userData);
            await get().fetchUsers();
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            throw err;
        }
    },

    removeUser: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deleteUserUseCase.execute(id);
            await get().fetchUsers();
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            throw err;
        }
    },
}));
