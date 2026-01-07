import type { IUserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

export class GetUsersUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
}
