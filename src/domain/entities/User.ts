export interface User {
    id: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER';
    isActive: boolean;
}
