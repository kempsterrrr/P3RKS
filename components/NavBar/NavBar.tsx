import Link from "next/link";
import { useRouter } from "next/router";

import { Disclosure } from "@headlessui/react";
import { Button } from "../Button";
import { ConnectWallet } from "../ConnectWallet";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const styles = {
  container: "px-5 py-3 mx-auto max-w-[1400px] w-full",
  navContainer: "flex justify-between items-center",
  logoContainer: "flex flex-shrink-0 flex items-center",
  logoText: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl",
  desktopMenuContainer: "hidden sm:flex sm:space-x-3",
  mobileMenuContainer: "flex items-center sm:hidden",
  mobileMenuButton:
    "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black",
  mobileMenuIcon: "block h-6 w-6",
  mobileMenuPanelContainer: "sm:hidden",
  mobileMenuPanelItems: "pt-2 pb-3 space-y-1",
  mobileMenuNavItem: "block pl-2 py-2 text-base font-medium",
};

const navItems = [
  {
    text: "Get Benefits",
    href: "/benefits",
  },
  {
    text: "Become a partner",
    href: "/partners",
  },
  {
    text: "Blog",
    href: "/blog",
  },
];

const NavBar = () => {
  const router = useRouter();
  console.log(router.pathname === navItems[0].href)
  return (
    <>
      <Disclosure as="nav" className={styles.container}>
        {({ open }) => (
          <>
            <div className={styles.navContainer}>
              <div className={styles.logoContainer}>
                <div className={styles.logoText}>
                  <Link href="/">
                    <a>B3NZ</a>
                  </Link>
                </div>
              </div>
              <div className={styles.desktopMenuContainer}>
                {navItems.map((item) => (
                  <Link key={item.text} href={item.href}>
                    <a className={`inline-flex items-center p-2 mr-4 text-lg ${router.pathname === item.href ? "text-blue-500 drop-shadow-sm" : ""}`}>
                      {item.text}
                    </a>
                  </Link>
                ))}
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
                  <Link key={item.text} href={item.href}>
                    <a className={`block pl-2 py-2 text-base font-medium ${router.pathname === item.href ? "text-blue-500 drop-shadow-sm" : ""}`}>
                      {item.text}
                    </a>
                  </Link>
                ))}
                <ConnectWallet />
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
