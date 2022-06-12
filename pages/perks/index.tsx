import { getPerks, incrementPerkView } from "../../services/PerksService";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../../stores/useStore";
import Head from "next/head";
import { PerksLayout } from "../../components/PerksLayout";
import ContentLoader from "react-content-loader";
import { TwitterShareButton } from "react-share";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const tabs = [
  { name: "All", href: "#", current: true },
  { name: "Popular", href: "#", current: false },
  { name: "Recently added", href: "#", current: false },
];

export async function getServerSideProps() {
  const perks = await getPerks();

  return {
    props: {
      perks,
    },
  };
}

const Perks: NextPage = ({ perks }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const ownsDDNFT = useStore((state) => state.user.DDNFT);

  useEffect(() => {
    if (ownsDDNFT != undefined) setLoading(false);
  }, [ownsDDNFT]);

  const handleSelectPerk = async (partnerName, perkId, views) => {
    await incrementPerkView(perkId, views + 1);
    router.push({
      pathname: `/perks/${partnerName.toLowerCase()}`,
      query: { id: perkId },
    });
  };

  const RenderLoading = () => {
    return (
      <div className="pt-[100px] lg:pt-[307px] absolute inset-y-0">
        <ContentLoader
          speed={2}
          height="70vh"
          width="90%"
          backgroundColor="#8a8a8a"
          foregroundColor="#ECECEC"
        >
          <rect x="0" y="0" rx="10" width="200" height="30" />
          <rect x="0" y="70" rx="10" width="300" height="30" />
          <rect x="0" y="150" rx="10" width="100%" height="450" />
        </ContentLoader>
      </div>
    );
  };

  const RenderPerks = () => {
    return (
      <div className="lg:pt-[207px]">
        <div className="pb-5 border-b border-gray-200 sm:pb-0 dark:border-[#FFFFFF]/[0.05]">
          <h3 className="text-[48px] text-[#171717] dark:text-[#ECECEC]">
            Perks
          </h3>
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
                        ? "border-black text-[#1A021B] dark:text-[#ECECEC] dark:border-[#ECECEC]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-[#ECECEC]",
                      "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition duration-150 hover:ease-in-out"
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
          {perks?.map((item) => (
            <a
              key={item.id}
              onClick={() =>
                handleSelectPerk(
                  item.fields["Partner Name"],
                  item.id,
                  item.fields["Views"]
                )
              }
            >
              <div
                className="p-[24px] border-[1px] border-[#1A021B]/[0.07] rounded-[16px] cursor-pointer transition duration-150 hover:ease-in-out hover:border-[#1A021B] hover:shadow-[0_0_25px_rgba(0,0,0,0.06)] dark:bg-[#232323] dark:border-[#1A021B
]/[0.07] dark:hover:border-[#ECECEC]"
              >
                <div className="flex items-center space-x-[12px]">
                  <img
                    className="w-[42px] h-[42px]"
                    src={item.fields["Partner Logo"][0].thumbnails.full.url}
                  />
                  <div>
                    <div className="text-[#1A021B] text-[19px] dark:text-[#ECECEC]">
                      {item.fields["Partner Name"]}
                    </div>
                    <div className="text-[#9F9B9F] text-[18px]">
                      {item.fields["Perk"]}
                    </div>
                  </div>
                </div>
                <div className="mt-[36px] flex flex-col space-y-[4px]">
                  <div className="grow text-[18px] dark:text-[#ECECEC]">
                    {item.fields["Perk Description"]}
                  </div>

                  <div className="flex space-x-[28px] text-[18px] text-[#9F9B9F] dark:text-[#8A8A8A]">
                    <div>4 days ago</div>
                    <div>{item.fields["Views"]} views</div>
                    <div>{item.fields["Uses"]} uses</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const RenderNotQualified = () => {
    return (
      <div className="px-10 absolute inset-y-0 my-auto lg:flex lg:justify-center lg:items-center">
        <div className="text-center space-y-[10px] lg:space-y-[34px] lg:text-left lg:w-[40%]">
          <div className="text-[#171717] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] dark:text-[#ECECEC]">
            Access perks
          </div>
          <div className="text-[18px] font-normal leading-[30px] space-y-[20px] md:text-[20px]  md:leading-[34px] md:space-y-[10px]">
            <div>
              Currently, only members of Developer DAO have access to P3RKS.
            </div>
            <div>
              If you’d like your DAO to be given access, join the DAO waitlist
              or{" "}
              <TwitterShareButton
                title={"test"}
                url="www.b3nz.xyz"
                className="underline cursor-pointer"
              >
                <div className=" dark:text-[#ECECEC] dark:hover:text-white">
                  tweet us
                </div>
              </TwitterShareButton>
              . If you’d prefer, just join Developer DAO!
            </div>
          </div>
          <div className="pt-5 space-y-[16px] lg:pt-0">
            <a href="/benefits">
              <a
                href="https://airtable.com/shrmK5l1ZdifJAtJY"
                className="flex justify-center items-center text-white text-[15px] font-medium rounded-full bg-[#1A021B] py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:border-[#414141] dark:bg-[#EAEAEA] dark:text-[#171717] dark:hover:bg-white"
              >
                Join DAO waitlist
              </a>
            </a>
            <a
              href="https://developerdao.com"
              className="flex justify-center items-center text-[#1A021B] text-[15px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] hover:shadow-[0_0_35px_rgba(0,0,0,0.07)] hover:shadow-[0_0_35px_rgba(0,0,0,0.07)] dark:text-white dark:bg-[#232323] dark:border-[#2E2E2E] dark:hover:border-white"
            >
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
        {loading ? (
          <RenderLoading />
        ) : ownsDDNFT ? (
          <RenderPerks />
        ) : (
          <RenderNotQualified />
        )}
      </PerksLayout>
    </>
  );
};

export default Perks;
