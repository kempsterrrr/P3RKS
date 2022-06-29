import { getPerks, incrementPerkView } from "../../services/PerksService";
import { getCategories } from "../../services/CategoriesService";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../../stores/useStore";
import Head from "next/head";
import { PerksLayout } from "../../components/PerksLayout";
import ContentLoader from "react-content-loader";
import { TwitterShareButton } from "react-share";
import { PerksTabMenu } from "../../components/PerksTabMenu";

export async function getStaticProps({ params }) {
  const perks = await getPerks();
  const categories = await getCategories();

  return {
    props: {
      perks,
      categories: [...categories],
    },
  };
}

const Perks: NextPage = ({ perks, categories }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const ownsDDNFT = useStore((state) => state.user.DDNFT);
  const [tabs, setTabs] = useState([{ name: "All", id: "all", active: true }]);
  const [perksToDisplay, setPerksToDisplay] = useState(perks);

  useEffect(() => {
    if (ownsDDNFT != undefined) setLoading(false);
  }, [ownsDDNFT]);

  useEffect(() => {
    const tempTabs = [...tabs];
    console.log(categories);
    categories.forEach((category, index) => {
      tempTabs.push({
        name: category.fields["Name"],
        id: category.id,
        active: false,
      });
    });

    setTabs(tempTabs);
  }, [categories]);

  useEffect(() => {
    const tempPerks = [...perks];
    const activeTab = tabs.find((tab) => tab.active);

    if (activeTab.name === "All") return setPerksToDisplay(perks);

    const filteredPerks = tempPerks.filter((perk) =>
      perk.fields["category"].find((el) => el === activeTab.name)
    );

    return setPerksToDisplay(filteredPerks);
  }, [tabs, perks]);

  const handleActiveTab = (index) => {
    const tempTabs = [...tabs];
    // update the array item that has active true to false
    // update the array item that has index ==== index to true

    tempTabs.map((item, i) =>
      item.active
        ? (item.active = false)
        : i === index
        ? (item.active = true)
        : null
    );

    setTabs(tempTabs);
  };

  const handleSelectPerk = async (partnerName, perkId, views) => {
    await incrementPerkView(perkId, views + 1);
    router.push({
      pathname: `/perks/${partnerName.toLowerCase()}`,
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
        <PerksTabMenu tabs={tabs} handleActiveTab={handleActiveTab} />
        <div className="mt-[32px] w-full grid gap-[24px] sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {perksToDisplay?.map((item) => (
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
        <title>Perks - P3RKS</title>
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
