import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";

interface ConnectButtonProps {
  styles: any;
}
const ConnectButton = (props: ConnectButtonProps) => {
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { setWalletAddress, setConnected } = useStore(
    (state) => ({
      setWalletAddress: state.setWalletAddress,
      setConnected: state.setConnected,
    }),
    shallow
  );
  const { data: account } = useAccount();

  useEffect(() => {
    if (account) {
      setWalletAddress(account.address!);
      setConnected(true);
    } else {
      setWalletAddress("");
      setConnected(false);
    }
  }, [account, setWalletAddress, setConnected]);

  return (
    <div>
      {account ? (
        <button
          className={props.styles.desktopMenuNavItem}
          onClick={() => disconnect()}
        >
          {`${account!.address!.substring(
            0,
            4
          )}...${account!.address!.substring(
            account!.address!.length - 4
          )}`.toUpperCase()}
        </button>
      ) : (
        <button
          className={props.styles.desktopMenuNavItem}
          key={connectors[0].id}
          onClick={() => connect(connectors[0])}
        >
          Connect Wallet
          {!connectors[0].ready && " (unsupported)"}
          {isConnecting &&
            connectors[0].id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      )}
      {/* move error handleing to side notifications or alert */}
      {error && <div>{error.message}</div>}
    </div>
  )
}

export default ConnectButton;