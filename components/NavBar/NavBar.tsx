import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import ConnectButton from '../NavBar/ConnectButton'
const styles = {
  container: "px-5 py-3 mx-auto max-w-[1400px] w-full",
  navContainer: "flex justify-between",
  logoContainer: "flex flex-shrink-0 flex items-center",
  logoText: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl",
  desktopMenuContainer: "hidden sm:flex sm:space-x-3",
  desktopMenuNavItem:
    "py-3 w-[180px] h-[60px] inline-flex justify-center items-center rounded-md border border-transparent bg-black text-base text-white font-medium shadow-sm hover:border-2 hover:border-black hover:bg-white hover:text-black focus:outline-black focus:ring-2 focus:ring-black focus:ring-offset-2",
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
];

const NavBar = () => {
  return (
    <>
      <Disclosure as="nav" className={styles.container}>
        {({ open }) => (
          <>
            <div className={styles.navContainer}>
              <div className={styles.logoContainer}>
                <h1 className={styles.logoText}>
                  <Link href="/">
                    <a>B3NZ</a>
                  </Link>
                </h1>
              </div>
              <div className={styles.desktopMenuContainer}>
                {navItems.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <a className={styles.desktopMenuNavItem}>{item.text}</a>
                  </Link>
                ))}
                <ConnectButton styles={styles} />
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
                {navItems.map((item, index) => (
                  <Link key={index} href={item.href} passHref>
                    <Disclosure.Button
                      as="a"
                      className={styles.mobileMenuNavItem}
                    >
                      {item.text}
                    </Disclosure.Button>
                  </Link>
                ))}
                <ConnectButton styles={styles} />
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
