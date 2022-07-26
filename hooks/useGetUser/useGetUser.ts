import { useGetUserProps } from "./useGetUser.d";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { MixpanelTracking } from "../../services/mixpanel";

const useGetUser = (redirectIfAuthenticated?: useGetUserProps) => {
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
      // @TODO put this call somewhere else. This is being called too many times
      // if (account.connector?.name) {
      //   MixpanelTracking.getInstance().walletTypeConnected(account.connector.name);
      // }
      if (redirectIfAuthenticated) router.push(`${redirectIfAuthenticated}`);
    } else {
      clearUser();
      router.push("/");
    }
  }, [account]);
};

export default useGetUser;
