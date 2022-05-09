import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContractRead } from "wagmi";
import GenisisContract from "../../abis/GenesisContract.json";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

import { Notification } from "../Notification";

const styles = {
  container: "flex grow",
};

const Layout = ({ children }: any) => {
  const { setDDNFT, walletAddress } = useStore(
    (state) => ({
      setDDNFT: state.setDDNFT,
      walletAddress: state.user.walletAddress,
    }),
    shallow
  );
  const router = useRouter();
  const [notification, setNotification] = useState({
    visible: false,
    isError: false,
    title: "",
    body: "",
  });
  const { isLoading } = useContractRead(
    {
      addressOrName: "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b",
      contractInterface: GenisisContract.abi,
    },
    "balanceOf",
    {
      enabled: !!walletAddress,
      args: walletAddress,
      onSuccess(data) {
        if (parseInt(data._hex) > 0) {
          setDDNFT(true);
          router.push("/benefits");
        } else {
          setDDNFT(false);
        }
      },
      onError(data) {
        setNotification({
          visible: true,
          isError: true,
          title: "Something went wrong",
          body: data.toString(),
        });
      },
    }
  );

  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
      <Footer />
      {notification.visible && (
        <Notification
          isError={notification.isError}
          title={notification.title}
          body={notification?.body}
        />
      )}
      {isLoading && (
        <Notification
          title="LOOKING FOR DEVELOPER DAO NFT"
          body="Checking wallet for Developer DAO NFT"
        />
      )}
    </>
  );
};

export default Layout;
