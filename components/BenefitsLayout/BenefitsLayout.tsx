import { useState, useRef, Fragment } from "react";
import { useContractRead, useDisconnect } from "wagmi";
import GenisisContract from "../../abis/GenesisContract.json";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaWallet } from "react-icons/fa";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { ConnectWalletModal } from "../ConnectWalletModal";
import { toast } from "react-toastify";

const BenefitsLayout = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [checkingWallet, setCheckingWallet] = useState(false);
  const toastId = useRef(null);
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
        setCheckingWallet(true);
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
            <div>{data.toSring()}</div>
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

  const styles = {
    mobileMenuContainer: "p-4 z-10 flex flex-col items-end  lg:hidden",
    mobileMenuButton:
      "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black",
    mobileMenuIcon: "block h-6 w-6",
    mobileMenuPanelContainer: "lg:hidden w-full",
    mobileMenuPanelItems: "pt-2 pb-3 space-y-1",
    mobileMenuNavItem: "block pl-2 py-2 text-base font-medium",
    desktopSidebarContainer:
      "hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0",
    desktopSidebarContentContainer:
      "flex flex-col border-r border-gray-200 py-[32px] pr-[30px] overflow-y-auto h-full flex-shrink-0 items-end",
    desktopSidebarButton:
      "w-[48px] h-[48px] border-[#D4D4D4] border-[1px] rounded-full flex justify-center items-center cursor-pointer",
    tooltip: " !rounded-full !bg-[#1A021B] !text-white",
  };

  return (
    <>
      <Disclosure as={Fragment}>
        {({ open }) => (
          <>
            <div className={styles.mobileMenuContainer}>
              {/* Mobile menu button */}
              <Disclosure.Button className={styles.mobileMenuButton}>
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className={styles.mobileMenuIcon} aria-hidden="true" />
                ) : (
                  <MenuIcon
                    className={styles.mobileMenuIcon}
                    aria-hidden="true"
                  />
                )}
              </Disclosure.Button>
              {/* Mobile Navbar */}
              <Disclosure.Panel className={styles.mobileMenuPanelContainer}>
                <div className={styles.mobileMenuPanelItems}>
                  {navItems.map((item) => (
                    <a
                      key={item.text}
                      className={styles.mobileMenuNavItem}
                      onClick={item.onClick}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>

            {/* Static sidebar for desktop */}
            <div className={styles.desktopSidebarContainer}>
              <div className={styles.desktopSidebarContentContainer}>
                <a
                  data-tip
                  data-for="benefits"
                  className={styles.desktopSidebarButton}
                  onClick={handleViewHome}
                >
                  <img src="./diamond-black.png" />
                </a>
                {/*@ts-ignore - React tooltip is working on a fix */}
                <ReactTooltip
                  id="benefits"
                  place="right"
                  type="dark"
                  effect="solid"
                  backgroundColor="black"
                  className={styles.tooltip}
                >
                  View Home
                </ReactTooltip>
                <div className="grow" />
                <a
                  data-tip
                  data-for="disconnect"
                  className={styles.desktopSidebarButton}
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
                  className={styles.tooltip}
                >
                  {connected ? `Disconnect ${walletAddress}` : "Connect Wallet"}
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
