import { ConnectWalletModalProps } from "./ConnectWalletModal.d";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useConnect } from "wagmi";
import Image from "next/image";

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  open,
  setOpen,
}) => {
  const { connect, connectors, error } = useConnect();

  return (
    <Transition.Root show={open}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#efefef] bg-opacity-95 transition-opacity dark:bg-[#0E0E0E]/[0.6]" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
            <div className="relative inline-block align-bottom w-full bg-[#FEFDFE] rounded-[30px] overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-[496px] dark:border-[#262626] dark:bg-[#1F1F1F]">
              <div className="px-[32px] pt-[32px] pb-[20px] flex justify-between items-center">
                <div className="text-[#1A021B] text-[24px] font-medium dark:text-[#ECECEC]">
                  Connect wallet
                </div>
                <button
                  className="bg-white rounded-md text-gray-400 transition duration-150 hover:ease-in-out hover:text-gray-500 dark:text-[#9E9E9E] dark:bg-transparent dark:hover:text-[#ECECEC]"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <hr className="dark:border-[#959595]/[0.7]" />
              <div className="px-[32px] pt-[24px] text-[18px] text-left space-y-[8px]">
                <p>
                  P3RKS currently only available to members of Developer DAO.
                </p>
                <p>
                  Want to add your DAO?{" "}
                  <a
                    href="https://airtable.com/shrmK5l1ZdifJAtJY"
                    className="underline underline-offset-1 text-black cursor-pointer dark:text-[#ECECEC]"
                    target="_blank"
                  >
                    Fill in this form!
                  </a>
                </p>
                <p>Connect your wallet to determine your elegibility:</p>
              </div>
              <div className="px-[32px] pt-[20px] pb-[32px] space-y-[8px] flex flex-col font-light">
                <button
                  className="py-[16px] px-[48px] bg-[#f6851b]/[.06] border-[2px] border-[#f6851b]/[0.1] rounded-full text-[#F6851B] text-[18px] flex justify-center items-center space-x-2 transition duration-150 hover:ease-in-out hover:border-[#f6851b]/[0.75]"
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
                  <div>
                    <span className="hidden md:inline-block">
                      Connect with{" "}
                    </span>{" "}
                    {connectors[0].name}
                  </div>
                </button>
                <button
                  className="py-[16px] px-[48px] bg-[#3b98fc]/[.06] border-[2px] border-[#3b98fc]/[0.1] rounded-full text-[#3b98fc] text-[18px] flex justify-center items-center space-x-2 transition duration-150 hover:ease-in-out hover:border-[#3b98fc]/[0.75]"
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
                  <div>
                    <span className="hidden md:inline-block">
                      Connect with{" "}
                    </span>
                    {connectors[1].name}
                  </div>
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
