import { config } from '../app/config';
import { tokenStorage } from './storage/tokenStorage';

const BASE_URL = config.API_URL || 'http://localhost:8080/api/v1';

export class ApiError extends Error {
    public status: number;
    public data?: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = tokenStorage.getToken();
    const headers = new Headers(options.headers);

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    if (options.body && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(data.message || 'Something went wrong', response.status, data);
    }

    return data.data;
}

export const apiClient = {
    get: <T>(path: string) => request<T>(path, { method: 'GET' }),
    post: <T>(path: string, body: any) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: any) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
