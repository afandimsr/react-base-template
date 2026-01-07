import type { UserRepository } from '../../domain/repositories/UserRepository';

export class DeleteUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: string): Promise<void> {
        return this.userRepository.deleteUser(id);
    }
}
