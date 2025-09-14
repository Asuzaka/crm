import { create } from "zustand";
import type { User } from "../../../entities/user/model/types";

interface AuthState {
  currentUser: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  startLoading: () => void;
  finishLoading: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loading: true,

  setUser: (user) => set({ currentUser: user, loading: false }),
  startLoading: () => set({ loading: true }),
  finishLoading: () => set({ loading: false }),
  logout: () => set({ currentUser: null }),
}));
