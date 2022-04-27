import useStore from "../../stores/useStore";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ConnectButton } from "../ConnectButton";
import { Button } from "../Button";

const styles = {
  dialogContainer: "fixed z-10 inset-0 overflow-y-auto",
  container:
    "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",
  dialogOverlay: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
  centerContainer: "hidden sm:inline-block sm:align-middle sm:h-screen",
  modalContainer:
    "relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6",
  dialogTitle: "text-lg leading-6 font-medium text-gray-900",
  info: "mt-3 text-center sm:mt-5",
  bodyContainer: "mt-2",
  bodyText: "text-sm text-gray-500",
  buttonsContainer: "flex justify-between space-x-3 mt-5 sm:mt-6",
};

const SuggestConnectModal = () => {
  const user = useStore((state) => state.user);
  const [open, setOpen] = useState(!user.connected);

  const onConnect = () => {
    setOpen(false);
  };

  const handleBrowse = () => {
    setOpen(false);
  };

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
              <div className={styles.info}>
                <Dialog.Title as="h3" className={styles.dialogTitle}>
                  Connect Wallet
                </Dialog.Title>
                <div className={styles.bodyContainer}>
                  <p className={styles.bodyText}>
                    To claim any benefits, connect your wallet.
                  </p>
                </div>
              </div>
              <div className={styles.buttonsContainer}>
                <ConnectButton onConnect={onConnect} />
                <Button as="button" onClick={handleBrowse}>
                  Just Browse
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SuggestConnectModal;
