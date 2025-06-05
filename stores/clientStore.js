import { create } from 'zustand';

export const useClientStore = create((set) => ({
  clientType: null,
  setClientType: (type) => set({ clientType: type }),
}));
