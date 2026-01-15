import type { IUserRepository } from '../../../domain/repositories/UserRepository';
import type { User } from '../../../domain/entities/User';
import type { CreateUserRequest } from '../Create/CreateUserRequest';

export class CreateUserUseCase {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: Omit<CreateUserRequest, 'id'>): Promise<User> {
        // Business rules could go here (e.g. validate email unique)
        return this.userRepository.createUser(user);
    }
}
