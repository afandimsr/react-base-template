import type { CreateUserRequest } from '../../application/user/Create/CreateUserRequest';
import type { UserDTO } from '../../application/user/GetUsersUseCase/types/UserDTO';
import type { User } from '../entities/User';
import type { ChangePasswordRequest } from '../../application/user/ChangePassword/ChangePasswordRequest';

export interface IUserRepository {
    getUsers(): Promise<UserDTO[]>;
    createUser(user: Omit<CreateUserRequest, 'id'>): Promise<User>;
    updateUser(id: string, user: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    changePassword(id: string, request: ChangePasswordRequest): Promise<void>;
}
