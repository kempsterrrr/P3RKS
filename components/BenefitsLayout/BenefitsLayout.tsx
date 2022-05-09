import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";
import { useDisconnect } from "wagmi";
import { useEffect, Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";

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

const BenefitsLayout = ({ children }: any) => {
  const { DDNFT, walletAddress } = useStore(
    (state) => ({
      DDNFT: state.user.DDNFT,
      walletAddress: state.user.walletAddress,
    }),
    shallow
  );
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!DDNFT) router.push("/");
  }, [DDNFT]);

  const handleViewBenefits = () => {
    router.push("/benefits");
  };

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  const navItems = [
    {
      text: "View all benefits",
      onClick: handleViewBenefits,
    },
    {
      text: "Disconnect",
      onClick: handleDisconnect,
    },
  ];

  return (
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
                onClick={handleViewBenefits}
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
                View all benefits
              </ReactTooltip>
              <div className="grow" />
              <a
                data-tip
                data-for="disconnect"
                className={styles.desktopSidebarButton}
                onClick={handleDisconnect}
              >
                {walletAddress[0]}
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
                {`Disconnect ${walletAddress}`}
              </ReactTooltip>
            </div>
          </div>
          {children}
        </>
      )}
    </Disclosure>
  );
};

export default BenefitsLayout;
