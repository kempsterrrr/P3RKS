import { ConnectButtonProps } from "./ConnectButton.types";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { Button } from "../Button";
import Notification from '../Notifications/Notification'
import Portal from '../Notifications/Portal'

const ConnectButton: React.FC<ConnectButtonProps> = ({ onConnect }) => {
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { data: account } = useAccount();
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
    if (onConnect) {
      onConnect();
    }
  };

  return (
    <div>
      {account ? (
        <Button as="button" onClick={handleDisconnect}>
          {`${account!.address!.substring(
            0,
            4
          )}...${account!.address!.substring(
            account!.address!.length - 4
          )}`.toUpperCase()}
        </Button>
      ) : (
        <Button as="button" onClick={handleConnect}>
          Connect Wallet
          {!connectors[0].ready && " (unsupported)"}
          {isConnecting &&
            connectors[0].id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      )}
      {/* move error handleing to side notifications or alert */}

      {error && <Portal><Notification notification={error.message} isError={true} /></Portal>}
    </div>
  );
};

export default ConnectButton;
