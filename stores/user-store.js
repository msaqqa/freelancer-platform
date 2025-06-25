import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (newUser) =>
        set((state) => ({
          user: {
            ...state.user,
            ...newUser,
          },
        })),
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage,
    },
  ),
);
