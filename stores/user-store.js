import { create } from 'zustand';

export const useUserStore = create((set) => ({
  accountType: '',
  setAccountType: (type) => set({ accountType: type }),
}));
