import { ConnectWalletModalProps } from "./ConnectWalletModal.d";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useConnect, useAccount } from "wagmi";
import Image from "next/image";

const styles = {
  dialogContainer: "fixed z-10 inset-0 overflow-y-auto",
  container:
    "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",
  dialogOverlay: "fixed inset-0 bg-[#efefef] bg-opacity-95 transition-opacity",
  centerContainer: "hidden sm:inline-block sm:align-middle sm:h-screen",
  modalContainer:
    "relative inline-block align-bottom w-full bg-[#FEFDFE] rounded-[30px] overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-[496px]",
  contentHeaderContainer:
    "px-[32px] pt-[32px] pb-[20px] flex justify-between items-center",
  headerTitle: "text-[#1A021B] text-[24px] font-medium",
  headerCloseButton:
    "bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
  closeIcon: "h-6 w-6",
  bodyContainer: "px-[32px] pt-[24px] text-left space-y-[8px]",
  bodyText: "text-[#9F9B9F] text-[18px]",
  boldText: "text-black",
  underlineText: "underline underline-offset-1",
  buttonsContainer: "px-[32px] pt-[20px] pb-[32px] space-y-[8px] flex flex-col",
  metamaskButton:
    "py-[16px] px-[48px] bg-[#f6851b]/[.06] border-[2px] border-[#f6851b]/[0.1] rounded-full text-[#F6851B] text-[18px] flex justify-center items-center space-x-2 hover:border-[#f6851b]/[0.75]",
  walletconnectButton:
    "py-[16px] px-[48px] bg-[#3b98fc]/[.06] border-[2px] border-[#3b98fc]/[0.1] rounded-full text-[#3b98fc] text-[18px] flex justify-center items-center space-x-2 hover:border-[#3b98fc]/[0.75]",
};

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  open,
  setOpen,
}) => {
  const { setConnected, setWalletAddress, clearUser } = useStore(
    (state) => ({
      setConnected: state.setConnected,
      setWalletAddress: state.setWalletAddress,
      clearUser: state.clearUser,
    }),
    shallow
  );
  const { connect, connectors, error } = useConnect();
  const { data: account } = useAccount();

  useEffect(() => {
    if (account) {
      setConnected(true);
      setWalletAddress(account.address!);
      setOpen(false);
    } else {
      clearUser();
      setOpen(false);
    }
  }, [account]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={styles.dialogContainer} onClose={setOpen}>
        <div className={styles.container}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className={styles.centerContainer} aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={styles.modalContainer}>
              <div className={styles.contentHeaderContainer}>
                <div className={styles.headerTitle}>View Benefits</div>
                <button
                  type="button"
                  className={styles.headerCloseButton}
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className={styles.closeIcon} aria-hidden="true" />
                </button>
              </div>
              <hr />
              <div className={styles.bodyContainer}>
                <p className={styles.bodyText}>
                  The B3NZ benefits are currently only available to members of{" "}
                  <span className={styles.boldText}>Developer DAO.</span>
                </p>
                <p className={styles.bodyText}>
                  Want us to add your DAO?{" "}
                  <span className={styles.underlineText}>
                    Fill in this form!
                  </span>
                </p>
                <p className={styles.bodyText}>
                  Connect your wallet to determine your elegibility:
                </p>
              </div>
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.metamaskButton}
                  disabled={!connectors[0].ready}
                  key={connectors[0].id}
                  onClick={() => connect(connectors[0])}
                >
                  <Image
                    width="20"
                    height="20"
                    src="/metamask-logo.png"
                    alt="metamask logo"
                  />
                  <div>Connect with {connectors[0].name}</div>
                </button>
                <button
                  className={styles.walletconnectButton}
                  disabled={!connectors[1].ready}
                  key={connectors[1].id}
                  onClick={() => connect(connectors[1])}
                >
                  <Image
                    width="24"
                    height="20"
                    src="/walletconnect-logo.png"
                    alt="walletconnect logo"
                  />
                  <div>Connect with {connectors[1].name}</div>
                </button>

                {error && <div>{error.message}</div>}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConnectWalletModal;
