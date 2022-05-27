import { useGetUserProps } from "./useGetUser.d";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect } from "react";

const useGetUser = (redirectIfAuthenticated: useGetUserProps) => {
  const router = useRouter();
  const { data: account } = useAccount();
  const { setConnected, setWalletAddress, clearUser } = useStore(
    (state) => ({
      setConnected: state.setConnected,
      setWalletAddress: state.setWalletAddress,
      clearUser: state.clearUser,
    }),
    shallow
  );

  useEffect(() => {
    if (account) {
      setConnected(true);
      setWalletAddress(account.address!);
      if (redirectIfAuthenticated) router.push(redirectIfAuthenticated);
    } else {
      clearUser();
      router.push("/");
    }
  }, [account]);
};

export default useGetUser;
