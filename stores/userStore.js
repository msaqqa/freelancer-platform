import { create } from 'zustand';

export const useUserStore = create((set) => ({
  accountType: '1',
  setAccountType: (type) => set({ accountType: type }),
}));
