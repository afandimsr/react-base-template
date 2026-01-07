import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

export class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: Omit<User, 'id'>): Promise<User> {
        // Business rules could go here (e.g. validate email unique)
        return this.userRepository.createUser(user);
    }
}
