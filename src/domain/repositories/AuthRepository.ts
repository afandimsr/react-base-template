import type { User } from '../entities/User';

export interface AuthRepository {
    login(username: string, password: string): Promise<{ token: string; user: User }>;
    logout(): Promise<void>;
    getUser(): Promise<User | null>;
}
