import type { JwtPayload } from '../../../infrastructure/auth/JwtPayload';
import type { User } from '../../../domain/entities/User';

export function mapJwtToUser(payload: JwtPayload): User {
    return {
        id: payload.user_id,
        email: payload.email,
        name: payload.name || '',
        roles: payload.roles,
        isActive: payload.is_active || false,
    };
}
