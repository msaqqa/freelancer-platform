import { create } from 'zustand';

export const useClientStore = create((set) => ({
  clientType: 'company',
  setClientType: (type) => set({ clientType: type }),
}));
