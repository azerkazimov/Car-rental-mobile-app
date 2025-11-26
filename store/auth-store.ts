import { create } from "zustand";

interface User {
    id: number,
    name?: string,
    email: string,
    password: string,
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));