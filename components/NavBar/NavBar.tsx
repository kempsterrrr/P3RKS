import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ConnectWalletModal } from "../ConnectWalletModal";

const navItems = [
  {
    text: "DAOs",
    href: "https://airtable.com/shrmK5l1ZdifJAtJY",
  },
  {
    text: "Partners",
    href: "https://airtable.com/shrwGFJhHZGw88oC5",
  },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="px-7 lg:px-14 dark:bg-[#202020]">
        {({ open }) => (
          <>
            <div className="py-3 flex justify-between items-center lg:h-24">
              <Link href="/">
                <a className="w-52 flex justify-start items-center space-x-[6px] text-[#1A021B] dark:text-[#ECECEC] dark:hover:text-white">
                  <svg
                    className="h-[32px] w-[32px]"
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
                  <div className="text-xl font-medium">P3RKS</div>
                </a>
              </Link>
              <div className="hidden lg:flex lg:space-x-[116px]">
                {navItems.map((item) => (
                  <a
                    className="text-[#908C91] text-lg transition duration-150 hover:ease-in-out hover:text-[#1A021B] dark:text-[#8A8A8A] dark:hover:text-white"
                    key={item.text}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex">
                <a
                  className="w-56 flex justify-center items-center text-center text-[#1A021B] text-lg font-medium rounded-full border-[1px] border-[#1a021b]/15 lg:py-3 2xl:py-4 lg:px-9 2xl:px-10 cursor-pointer transition duration-150 hover:ease-in-out hover:shadow-[0_0_25px_rgba(0,0,0,0.05)] dark:text-white dark:bg-[#232323] dark:border-[#2E2E2E] dark:hover:border-white"
                  onClick={() => setOpen(true)}
                >
                  Connect wallet
                </a>
              </div>
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <Disclosure.Panel className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.text}
                    className="block pl-2 py-2 text-base font-light"
                    href={item.href}
                  >
                    {item.text}
                  </a>
                ))}
                <div className="block pl-2 py-2 text-base font-medium"></div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <hr className="dark:border-[#252525]" />
      <ConnectWalletModal open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
