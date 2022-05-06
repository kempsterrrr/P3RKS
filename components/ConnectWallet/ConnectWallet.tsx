import { ConnectWalletProps } from "./ConnectWallet.types";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { Button } from "../Button";
import { Notification } from "../Notification";

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const {
    connect,
    connectors,
    error,
    isConnecting,
    isConnected,
    pendingConnector,
  } = useConnect();

  const { disconnect } = useDisconnect();
  const { data: account } = useAccount();

  const ensName = useEnsName({
    address: account?.address,
  })

  const { setWalletAddress, setConnected } = useStore(
    (state) => ({
      setWalletAddress: state.setWalletAddress,
      setConnected: state.setConnected,
    }),
    shallow
  );

  useEffect(() => {
    if (account) {
      setWalletAddress(account.address!);
      setConnected(true);
    } else {
      setWalletAddress("");
      setConnected(false);
    }
  }, [account, setWalletAddress, setConnected]);

  const handleDisconnect = () => {
    disconnect();
  };

  const handleConnect = () => {
    connect(connectors[0]);
    if (onConnect && isConnected) {
      onConnect();
    }
  };

  return (
    <div>
      {account ? (
        <a onClick={handleDisconnect}>
          {ensName?.data ? ensName.data : `${account!.address!.substring(
            0,
            4
          )}...${account!.address!.substring(
            account!.address!.length - 4
          )}`.toUpperCase()}
        </a>
      ) : (
        <a className="text-center text-[#1A021B] text-[18px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-[18px] px-[42px] " onClick={handleConnect}>
          Connect Wallet
          {!connectors[0].ready && " (unsupported)"}
          {isConnecting &&
            connectors[0].id === pendingConnector?.id &&
            " (connecting)"}
        </a>
      )}
      {error && (
        <Notification
          isError={true}
          title="Wallet Connection"
          body={error.message}
        />
      )}
    </div>
  );
};

export default ConnectWallet;
