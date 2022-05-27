import create from "zustand";
import { devtools } from "zustand/middleware";

interface useStore {
  user: {
    walletAddress: string;
    connected: boolean;
    DDNFT: boolean;
    darkMode: string;
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
    theme: "system",
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
    set((state: any) => ({
      user: {
        ...state.user,
        DDNFT: data,
      },
    })),
  setTheme: (data: string) =>
    set((state: any) => ({
      user: {
        ...state.user,
        theme: data,
      },
    })),
  clearUser: () =>
    set((state: any) => ({
      user: {
        ...state.user,
        walletAddress: "",
        connected: false,
        DDNFT: false,
      },
    })),
});

const useStore = create(devtools(store));

export default useStore;
