import { PerksLayoutProps } from "./PerksLayout.d";
import { useEffect, useRef, Fragment } from "react";
import { useContractRead, useDisconnect, useEnsName } from "wagmi";
import GenisisContract from "../../abis/GenesisContract.json";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";

const PerksLayout: React.FC<PerksLayoutProps> = ({ children }) => {
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

  useEffect(() => {
    if (!connected) router.push("/");
  }, [connected]);

  const handleAllPerks = () => {
    router.push("/perks");
  };

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  const ensName = useEnsName({
    address: walletAddress,
  })?.data;

  const navItems = [
    {
      text: "View all perks",
      onClick: handleAllPerks,
    },
    {
      text: "Disconnect",
      onClick: handleDisconnect,
    },
  ];

  return (
    <>
      <Disclosure as={Fragment}>
        {({ open }) => (
          <>
            <div className="p-4 z-10 flex flex-col items-end lg:hidden">
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
                  className="w-[48px] h-[48px] border-[#ECEBEC] text-[#9E9E9E] hover:text-[#1A021B] border-[1px] rounded-full flex justify-center items-center text-red cursor-pointer"
                  onClick={handleAllPerks}
                >
                  <svg
                    className="h-[20px] w-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M0 0h24v24H0z" stroke="none" />
                    <path d="M6 5h12l3 5-8.5 9.5a.7.7 0 0 1-1 0L3 10l3-5" />
                    <path d="M10 12 8 9.8l.6-1" />
                  </svg>
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
                  View all perks
                </ReactTooltip>
                <div className="grow" />
                <a
                  data-tip
                  data-for="disconnect"
                  className="w-[48px] h-[48px] rotate-180 border-[#ECEBEC] text-[#9E9E9E] hover:text-[#1A021B] border-[1px] rounded-full flex justify-center items-center cursor-pointer"
                  onClick={handleDisconnect}
                >
                  <svg
                    className="h-[20px] w-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M0 0h24v24H0z" stroke="none" />
                    <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                    <path d="M7 12h14l-3-3m0 6 3-3" />
                  </svg>
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
                  Disconnect {ensName || walletAddress}
                </ReactTooltip>
              </div>
            </div>
            {children}
          </>
        )}
      </Disclosure>
    </>
  );
};

export default PerksLayout;
