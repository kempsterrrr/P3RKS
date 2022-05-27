import { PerksLayoutProps } from "./PerksLayout.d";
import { useEffect, useRef, Fragment } from "react";
import { useContractRead, useDisconnect, useEnsName } from "wagmi";
import GenisisContract from "../../abis/GenesisContract.json";
import { useGetUser } from "../../hooks/useGetUser";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";

const PerksLayout: React.FC<PerksLayoutProps> = ({ children }) => {
  useGetUser();
  const toastId = useRef<any>(null);
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const { walletAddress, setDDNFT, connected, theme, setTheme } = useStore(
    (state) => ({
      walletAddress: state.user.walletAddress,
      setDDNFT: state.setDDNFT,
      connected: state.user.connected,
      theme: state.user.theme,
      setTheme: state.setTheme,
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
              <div className="flex flex-col border-r border-[#1A021B]/[0.05] py-[32px] pr-[30px] overflow-y-auto h-full flex-shrink-0 items-end dark:border-[#FFFFFF]/[0.05]">
                <a
                  data-tip
                  data-for="benefits"
                  className="w-[48px] h-[48px] border-[#ECEBEC] text-[#9E9E9E] hover:text-[#1A021B] border-[1px] rounded-full flex justify-center items-center text-red cursor-pointer dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
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
                <div className="grow" />
                <div className="space-y-[16px]">
                  <a
                    data-tip
                    data-for="theme"
                    className="w-[48px] h-[48px] rotate-180 border-[#ECEBEC] text-[#9E9E9E] hover:text-[#1A021B] border-[1px] rounded-full flex justify-center items-center cursor-pointer dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
                    onClick={() => {
                      localStorage.theme = "light";
                    }}
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
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 5V3M17 7l1.4-1.4M19 12h2M17 17l1.4 1.4M12 19v2M7 17l-1.4 1.4M6 12H4M7 7 5.6 5.6" />
                    </svg>
                  </a>
                  <a
                    data-tip
                    data-for="disconnect"
                    className="w-[48px] h-[48px] rotate-180 border-[#ECEBEC] text-[#9E9E9E] hover:text-[#1A021B] border-[1px] rounded-full flex justify-center items-center cursor-pointer dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
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
                </div>
                {/*@ts-ignore - React tooltip is working on a fix */}
              </div>
            </div>
            {children}
          </>
        )}
      </Disclosure>
      {/*@ts-ignore - React tooltip is working on a fix */}
      <ReactTooltip
        id="benefits"
        place="right"
        effect="solid"
        backgroundColor={
          theme == "dark" || theme == "system" ? "#2B2B2B" : "#1A021B"
        }
        className="!rounded-full"
      >
        <div className="text-white dark:text-[#FFF]/[0.50]">View all perks</div>
      </ReactTooltip>
      <ReactTooltip
        clickable
        id="theme"
        place="right"
        effect="solid"
        delayHide={500}
        delayUpdate={500}
        backgroundColor={
          theme == "dark" || theme == "system" ? "#2B2B2B" : "#1A021B"
        }
        className="!rounded-lg !px-[18px] !py-[10px]"
      >
        <div
          className="py-1 cursor-pointer text-white dark:text-[#FFF]/[0.50] dark:hover:text-white"
          onClick={() => setTheme("system")}
        >
          System
        </div>
        <div
          className="py-1 cursor-pointer text-white dark:text-[#FFF]/[0.50] dark:hover:text-white"
          onClick={() => setTheme("dark")}
        >
          Dark
        </div>
        <div
          className="py-1 cursor-pointer text-white dark:text-[#FFF]/[0.50] dark:hover:text-white"
          onClick={() => setTheme("light")}
        >
          Light
        </div>
      </ReactTooltip>
      <ReactTooltip
        id="disconnect"
        place="right"
        effect="solid"
        backgroundColor={
          theme == "dark" || theme == "system" ? "#2B2B2B" : "#1A021B"
        }
        className="!rounded-full"
      >
        <div className="text-white dark:text-[#FFF]/[0.50]">
          Disconnect {ensName || walletAddress}
        </div>
      </ReactTooltip>
    </>
  );
};

export default PerksLayout;
