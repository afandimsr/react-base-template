import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';

export class LoginUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(username: string, password: string): Promise<{ token: string; user: User }> {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }
        return this.authRepository.login(username, password);
    }
}
