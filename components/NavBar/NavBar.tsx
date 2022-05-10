import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const styles = {
  container: "px-[30px] lg:px-[60px]",
  navContainer: "py-3 flex justify-between items-center lg:h-[120px]",
  logoContainer: "flex justify-center items-center space-x-[6px]",
  logoImage: "w-[32px] h-[30px]",
  logoText: "text-[20px] font-medium text-[#1A021B]",
  desktopMenuContainer: "hidden lg:flex lg:space-x-[116px]",
  desktopMenuButton: "text-[#908C91] text-[18px] hover:text-[#1A021B]",
  viewBenefitsButtonContainer: "hidden lg:flex",
  viewBenefitsButton:
    "text-center text-[#1A021B] text-[18px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-[18px] px-[42px] cursor-pointer hover:shadow-[0_0_25px_rgba(0,0,0,0.05)]",
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
    text: "Blog",
    href: "/blog",
  },
  {
    text: "DAOs",
    href: "/",
  },
  {
    text: "Partners",
    href: "/partners",
  },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

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
                  <a
                    className={styles.desktopMenuButton}
                    key={item.text}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                ))}
              </div>
              <div className={styles.viewBenefitsButtonContainer}>
                <Link href="/benefits">
                  <a className={styles.viewBenefitsButton}>View benefits</a>
                </Link>
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
                  <a
                    key={item.text}
                    className={styles.mobileMenuNavItem}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                ))}
                <div className={styles.mobileMenuNavItem}></div>
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
