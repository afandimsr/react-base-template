import type { IUserRepository } from '../../../domain/repositories/UserRepository';
import type { UserDTO } from '../GetUsersUseCase/types/UserDTO';

export class GetUsersUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<UserDTO[]> {
        return this.userRepository.getUsers();
    }
}
