import create from "zustand";

interface useStore {
  user: {
    walletAddress: string;
    connected: boolean;
  };
  setWalletAddress: (data: string) => void;
  setConnected: (data: boolean) => void;
}

const useStore = create<useStore>((set) => ({
  user: {
    walletAddress: "",
    connected: false,
  },
  setWalletAddress: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        walletAddress: data,
      },
    })),
  setConnected: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        connected: data,
      },
    })),
}));

export default useStore;
