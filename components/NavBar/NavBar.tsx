import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ConnectWalletModal } from "../ConnectWalletModal";

const navItems = [
  {
    text: "DAOs",
    href: "/",
  },
  {
    text: "Partners",
    href: "https://airtable.com/shrZZn6ZKZfvrUqDX",
  },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="px-[30px] lg:px-[60px]">
        {({ open }) => (
          <>
            <div className="py-3 flex justify-between items-center lg:h-[120px]">
              <Link href="/">
                <a className="w-[220px] flex justify-start items-center space-x-[6px]">
                  <Image
                    width="32"
                    height="30"
                    src="/diamond.png"
                    alt="diamond logo"
                  />
                  <div className="text-[20px] font-medium text-[#1A021B]">
                    P3RKS
                  </div>
                </a>
              </Link>
              <div className="hidden lg:flex lg:space-x-[116px]">
                {navItems.map((item) => (
                  <a
                    className="text-[#908C91] text-[18px] hover:text-[#1A021B]"
                    key={item.text}
                    href={item.href}
                  >
                    {item.text}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex">
                <a
                  className="w-[220px] flex justify-center items-center text-center text-[#1A021B] text-[18px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-[18px] px-[42px] cursor-pointer hover:shadow-[0_0_25px_rgba(0,0,0,0.05)]"
                  onClick={() => setOpen(true)}
                >
                  Connect wallet
                </a>
              </div>
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <Disclosure.Panel className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.text}
                    className="block pl-2 py-2 text-base font-medium"
                    href={item.href}
                  >
                    {item.text}
                  </a>
                ))}
                <Link href="/benefits">
                  <a className="block pl-2 py-2 text-base font-medium">
                    View benefits
                  </a>
                </Link>
                <div className="block pl-2 py-2 text-base font-medium"></div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <hr />
      <ConnectWalletModal open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
