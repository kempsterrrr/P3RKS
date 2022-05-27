import useStore from "../stores/useStore";
import type { NextPage } from "next";
import Head from "next/head";
import { PerksLayout } from "../components/PerksLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "All", href: "#", current: true },
  { name: "Popular", href: "#", current: false },
  { name: "Recently added", href: "#", current: false },
];

const Perks: NextPage = () => {
  const ownsDDNFT = useStore((state) => state.user.DDNFT);

  const RenderPerks = () => {
    return (
      <div className="py-[20px] lg:pt-[207px]">
        <div className="max-w-[100%] px-4 sm:px-[40px]">
          <div className="pb-5 border-b border-gray-200 sm:pb-0">
            <h3 className="text-[48px]">Perks</h3>
            <div className="mt-[36px]">
              <div className="sm:hidden">
                <label htmlFor="current-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="current-tab"
                  name="current-tab"
                  className="block w-full pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? "border-black text-[#1A021B]"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="mt-[32px] w-full grid gap-[24px] sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(12)].map((item, index) => (
              <div
                key={index}
                className="p-[24px] border-[1px] border-[#1A021B]/[0.07] rounded-[16px]"
              >
                <div className="flex items-center space-x-[12px]">
                  <img className="w-[36px] h-[36px]" src="./kubera-logo.png" />
                  <div>
                    <div className="text-[#1A021B] text-[16px]">Kubera</div>
                    <div className="text-[#9F9B9F] text-[16px]">
                      Net worth tracker
                    </div>
                  </div>
                </div>
                {true ? (
                  <div className="mt-[36px] flex flex-col space-y-[4px]">
                    <div className="grow">
                      30% off lifetime membership on PRO plan
                    </div>

                    <div className="flex space-x-[28px] text-[16px] text-[#9F9B9F]">
                      <div>4 days ago</div>
                      <div>332 views</div>
                      <div>44 uses</div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const RenderNotQualified = () => {
    return (
      <div className="px-10 h-full lg:flex lg:justify-center lg:items-center">
        <div className="text-center space-y-[10px] lg:space-y-[34px] lg:text-left lg:w-[40%]">
          <div className="text-[#171717] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px]">
            Access perks
          </div>
          <div className="text-[#9E9E9E] text-[18px] font-normal leading-[30px] space-y-[20px] md:text-[20px]  md:leading-[34px] md:space-y-[10px]">
            <div>
              Currently, only members of Developer DAO have access to P3RKS.
            </div>
            <div>
              If you’d like your DAO to be given access, join the DAO waitlist
              or <span className="underline cursor-pointer">tweet us</span>. If
              you’d prefer, just join Developer DAO!
            </div>
          </div>
          <div className="pt-5 space-y-[16px] lg:pt-0">
            <a href="/benefits">
              <a className="flex justify-center items-center text-white text-[15px] font-medium rounded-full bg-[#1A021B] py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] hover:shadow-[0_0_35px_rgba(0,0,0,0.25)]">
                Join DAO waitlist
              </a>
            </a>
            <a className="flex justify-center items-center text-[#1A021B] text-[15px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] hover:shadow-[0_0_35px_rgba(0,0,0,0.07)]">
              Join Developer DAO
            </a>
          </div>
        </div>
        <div className="fade lg:w-[60%] lg:flex lg:justify-center">
          <img src="./partners.png" alt="partners" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Perks - B3NZ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PerksLayout>
        <main className="lg:pl-64 flex flex-col flex-1">
          {ownsDDNFT ? <RenderPerks /> : <RenderNotQualified />}
        </main>
      </PerksLayout>
    </>
  );
};

export default Perks;
