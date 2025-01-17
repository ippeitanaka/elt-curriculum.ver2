import { User } from '../types';

export async function login(email: string, password: string): Promise<User | null> {
  // TODO: Implement actual authentication
  return null;
}

export function logout(): void {
  // TODO: Implement logout
}

export function useAuth() {
  // TODO: Implement auth hook
  return {
    user: null,
    login,
    logout,
    isLoading: false,
  };
}