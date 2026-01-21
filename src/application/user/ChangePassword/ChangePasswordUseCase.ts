import type { IUserRepository } from '../../../domain/repositories/UserRepository';
import type { ChangePasswordRequest } from './ChangePasswordRequest';

export class ChangePasswordUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: string, request: ChangePasswordRequest): Promise<void> {
        if (!request.new_password || request.new_password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (request.new_password !== request.confirm_password) {
            throw new Error('Passwords do not match');
        }
        return this.userRepository.changePassword(id, request);
    }
}
