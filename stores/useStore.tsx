import create from "zustand";
import { devtools } from "zustand/middleware";

interface useStore {
  user: {
    walletAddress: string;
    connected: boolean;
    DDNFT: boolean;
  };
  setWalletAddress: (data: string) => void;
  setConnected: (data: boolean) => void;
  setDDNFT: (data: boolean) => void;
  clearUser: () => void;
}

const store = (set: any) => ({
  user: {
    walletAddress: "",
    connected: false,
    DDNFT: false,
  },
  setWalletAddress: (data: any) =>
    set((state: any) => ({
      user: {
        ...state.user,
        walletAddress: data,
      },
    })),
  setConnected: (data: any) =>
    set((state: any) => ({
      user: {
        ...state.user,
        connected: data,
      },
    })),
  setDDNFT: (data: boolean) =>
    set((state: useStore) => ({
      user: {
        ...state.user,
        DDNFT: data,
      },
    })),
  clearUser: () =>
    set(() => ({
      user: {
        walletAddress: "",
        connected: false,
        DDNFT: false,
      },
    })),
});

const useStore = create(devtools(store));

export default useStore;
