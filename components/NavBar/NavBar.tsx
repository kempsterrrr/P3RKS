import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { Button } from "../Button";
import { ConnectWallet } from "../ConnectWallet";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const styles = {
  container: "px-[30px] lg:px-[60px]",
  navContainer: "py-3 flex justify-between items-center lg:h-[120px]",
  logoContainer: "flex justify-center items-center space-x-[6px]",
  logoImage: "w-[32px] h-[30px]",
  logoText: "text-[20px] font-medium text-[##1A021B]",
  desktopMenuContainer: "hidden lg:flex lg:space-x-[116px]",
  desktopMenuButton: "text-[#908C91] text-[18px]",
  walletContainer: "hidden lg:flex",
  mobileMenuContainer: "flex items-center lg:hidden",
  mobileMenuButton:
    "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black",
  mobileMenuIcon: "block h-6 w-6",
  mobileMenuPanelContainer: "lg:hidden",
  mobileMenuPanelItems: "pt-2 pb-3 space-y-1",
  mobileMenuNavItem: "block pl-2 py-2 text-base font-medium",
};

const navItems = [
  {
      text:"Blog",
      href:"/blog",
  },
  {
      text:"DAOs",
      href:"/",
  },
    {
    text: "Partners",
    href: "/partners",
  },
];

const NavBar = () => {
  return (
    <>
      <Disclosure as="nav" className={styles.container}>
        {({ open }) => (
          <>
            <div className={styles.navContainer}>
                  <Link href="/">
                    <a className={styles.logoContainer}>
                      <img className={styles.logoImage} src="diamond.png" />
                      <div className={styles.logoText}>B3NZ</div>
                    </a>
                  </Link>
              <div className={styles.desktopMenuContainer}>
                {navItems.map((item) => (
                  <a className={styles.desktopMenuButton} key={item.text} href={item.href}>
                    {item.text}
                  </a>
                ))}
              </div>
              <div className={styles.walletContainer}>
                <ConnectWallet />
              </div>
              <div className={styles.mobileMenuContainer}>
                <Disclosure.Button className={styles.mobileMenuButton}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon
                      className={styles.mobileMenuIcon}
                      aria-hidden="true"
                    />
                  ) : (
                    <MenuIcon
                      className={styles.mobileMenuIcon}
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <Disclosure.Panel className={styles.mobileMenuPanelContainer}>
              <div className={styles.mobileMenuPanelItems}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    as="link"
                    className={styles.mobileMenuNavItem}
                    href={item.href}
                  >
                    {item.text}
                  </Button>
                ))}
                <div className={styles.mobileMenuNavItem}>
                    <ConnectWallet /> 
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <hr />
    </>
  );
};

export default NavBar;
