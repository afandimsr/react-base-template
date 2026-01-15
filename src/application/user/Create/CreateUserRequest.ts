export interface CreateUserRequest {
    id: string;
    name: string;
    email: string;
    roles?: string[];
    isActive: boolean;
}
