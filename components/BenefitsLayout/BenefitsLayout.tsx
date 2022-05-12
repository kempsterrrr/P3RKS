import { BenefitsLayoutProps } from "./BenefitsLayout.d";
import { useState, useRef, Fragment } from "react";
import { useContractRead, useDisconnect, useEnsName } from "wagmi";
import GenisisContract from "../../abis/GenesisContract.json";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaWallet } from "react-icons/fa";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { ConnectWalletModal } from "../ConnectWalletModal";
import { toast } from "react-toastify";

const BenefitsLayout: React.FC<BenefitsLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toastId = useRef<any>(null);
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const { walletAddress, setDDNFT, connected } = useStore(
    (state) => ({
      walletAddress: state.user.walletAddress,
      setDDNFT: state.setDDNFT,
      connected: state.user.connected,
    }),
    shallow
  );

  const searchForNFT = () =>
    (toastId.current = toast("Looking for Developer DAO NFT."));

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
        searchForNFT();
        if (parseInt(data._hex) > 0) {
          toast.update(toastId.current, { render: "Developer DAO NFT found!" });
          setDDNFT(true);
        } else {
          toast.update(toastId.current, {
            render: (
              <div className="space-y-[1px]">
                <div className="font-bold">Developer DAO NFT not found!</div>
                <div>
                  To view and redeem benefits you need a Developer DAO NFT.
                </div>
              </div>
            ),
          });
          setDDNFT(false);
        }
      },
      onError(data) {
        toast(
          <div className="space-y-1">
            <div className="font-bold">Something went wrong</div>
            <div>{data.toString()}</div>
          </div>
        );
      },
    }
  );

  const handleViewHome = () => {
    router.push("/");
  };

  const handleConnect = () => {
    setOpen(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const ensName = useEnsName({
    address: walletAddress,
  })?.data;

  const navItems = [
    {
      text: "View Home",
      onClick: handleViewHome,
    },
    {
      text: connected ? "Disconnect" : "Connect",
      onClick: connected ? handleDisconnect : handleConnect,
    },
  ];

  return (
    <>
      <Disclosure as={Fragment}>
        {({ open }) => (
          <>
            <div className="p-4 z-10 flex flex-col items-end  lg:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
              {/* Mobile Navbar */}
              <Disclosure.Panel className="lg:hidden w-full">
                <div className="pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.text}
                      className="block pl-2 py-2 text-base font-medium"
                      onClick={item.onClick}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
              <div className="flex flex-col border-r border-gray-200 py-[32px] pr-[30px] overflow-y-auto h-full flex-shrink-0 items-end">
                <a
                  data-tip
                  data-for="benefits"
                  className="w-[48px] h-[48px] border-[#D4D4D4] border-[1px] rounded-full flex justify-center items-center cursor-pointer"
                  onClick={handleViewHome}
                >
                  <Image
                    width="20"
                    height="20"
                    src="/diamond-black.png"
                    alt="diamong-black logo"
                  />
                </a>
                {/*@ts-ignore - React tooltip is working on a fix */}
                <ReactTooltip
                  id="benefits"
                  place="right"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  className="!rounded-full !bg-[#1A021B] !text-white"
                >
                  View Home
                </ReactTooltip>
                <div className="grow" />
                <a
                  data-tip
                  data-for="disconnect"
                  className="w-[48px] h-[48px] border-[#D4D4D4] border-[1px] rounded-full flex justify-center items-center cursor-pointer"
                  onClick={connected ? handleDisconnect : handleConnect}
                >
                  {connected ? <VscDebugDisconnect /> : <FaWallet />}
                </a>
                {/*@ts-ignore - React tooltip is working on a fix */}
                <ReactTooltip
                  id="disconnect"
                  place="right"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  className="!rounded-full !bg-[#1A021B] !text-white"
                >
                  {connected
                    ? `Disconnect ${ensName || walletAddress}`
                    : "Connect Wallet"}
                </ReactTooltip>
              </div>
            </div>
            {children}
          </>
        )}
      </Disclosure>
      <ConnectWalletModal open={open} setOpen={setOpen} />
    </>
  );
};

export default BenefitsLayout;
