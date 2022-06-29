import { getPerks, incrementPerkUse } from "../../services/PerksService";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PerksLayout } from "../../components/PerksLayout";
import Link from "next/link";
import useStore from "../../stores/useStore";
import ReactTooltip from "react-tooltip";
import md from "markdown-it";

// Components
import { Carousel } from "../../components/Carousel";

export async function getStaticPaths() {
  const perks = await getPerks();
  const paths = perks.map((perk) => ({
    params: { partnerName: perk.fields["Partner Name"].toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const perks = await getPerks();
  const perk = perks.find(
    (perk) => perk.fields["Partner Name"].toLowerCase() === params.partnerName
  );

  return {
    props: {
      perk,
    },
  };
}

const RedeemPage = ({ perk }: any) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const router = useRouter();
  const theme = useStore((state) => state.user.theme);

  const images = perk.fields["Gallery"];
  let items: any = [];

  console.log(items);

  images.map((item: any) => {
    let image = {
      itemId: item.id,
      mediaUrl: item.url,
      width: 600,
      height: 400,
    };

    items.push(image);
  });

  const handleRedeemPerk = async (
    perkId: string,
    uses: string,
    website: string
  ) => {
    await incrementPerkUse(perkId, uses + 1);
    router.push(website);
  };

  useEffect(() => {
    setHeight(ref.current.parentElement.offsetHeight);
    setWidth(ref.current.parentElement.offsetWidth);

    console.log(ref.current.parentElement);
    console.log(ref.current.parentElement.offsetHeight);
    console.log(ref.current.parentElement.offsetWidth);
  }, []);

  return (
    <>
      <Head>
        <title>Rewards from {perk.fields["Partner Name"]} | P3RKS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PerksLayout>
        <Link href="/perks">
          <a className="h-[48px] w-fit flex items-center cursor-pointer gap-[5px] hover:text-[#1A021B] dark:hover:text-[#ECECEC]">
            <svg
              className="h-[20px] w-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="M5 12h14M5 12l4 4M5 12l4-4" />
            </svg>
            Back
          </a>
        </Link>

        <div className="flex space-x-[60px] lg:mt-[109px]">
          <div className="flex-1 space-y-[30px] lg:space-y-[60px]">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[32px] lg:text-[48px] text-[#171717] dark:text-[#ECECEC]">
                  {perk?.fields["Partner Name"]}
                </div>
                <div className="text-[20px] lg:text-[24px]">
                  {perk?.fields["Perk"]}
                </div>
              </div>
              <div className="flex justify-end gap-[16px] lg:hidden">
                <a
                  data-tip
                  data-for="website"
                  className="w-[48px] h-[48px] border-[#ECEBEC] text-[#9E9E9E] border-[1px] rounded-full flex justify-center items-center cursor-pointer transition duration-150 hover:ease-in-out hover:border-[#1A021B] hover:text-[#1A021B] dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
                  onClick={() => router.push(perk?.fields["Website"])}
                >
                  <svg
                    className="h-[20px] w-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M0 0h24v24H0z" stroke="none" />
                    <rect x="3" y="4" width="18" height="12" rx="1" />
                    <path d="M7 20h10M9 16v4M15 16v4" />
                  </svg>
                </a>
                <a
                  data-tip
                  data-for="twitter"
                  className="w-[48px] h-[48px] border-[#ECEBEC] text-[#9E9E9E] border-[1px] rounded-full flex justify-center items-center cursor-pointer transition duration-150 hover:ease-in-out hover:border-[#1A021B] hover:text-[#1A021B] dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
                  onClick={() => router.push(perk?.fields["Twitter"])}
                >
                  <svg
                    className="h-[20px] w-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M0 0h24v24H0z" stroke="none" />
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-[20px]">
              <div className="space-y-[4px]">
                <div className="text-[18px] lg:text-[20px] text-[#171717] dark:text-[#ECECEC]">
                  About {perk?.fields["Partner Name"]}
                </div>
                <div className="text-[16px] lg:text-[18px]">
                  {perk?.fields["Partner About"]}
                </div>
              </div>
              <div className="lg:hidden ">
                <div className="space-y-[4px]">
                  <div className="text-[18px] text-[#171717] dark:text-[#ECECEC]">
                    Description
                  </div>
                  <div className="text-[16px]">
                    {perk?.fields["Perk Description"]}
                  </div>
                </div>
                <div className="my-[20px] space-y-[4px]">
                  <div className="text-[18px] text-[#171717] dark:text-[#ECECEC]">
                    How to redeem?
                  </div>
                  <div
                    className="text-[16px] child:list-decimal child:ml-4 child:mt-2"
                    dangerouslySetInnerHTML={{
                      __html: md().render(
                        perk?.fields["Redemption Instructions"]
                      ),
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-[16px] lg:text-[20px] text-[#171717] dark:text-[#ECECEC]">
                Gallery
              </div>
              <div
                ref={ref}
                className="rounded-[16px] overflow-hidden border-[1px] border-[#F3F1F3] dark:border-[#2E2E2E] w-full h-full"
              >
                <Carousel images={images} />
              </div>
              <a
                className="fixed lg:hidden bottom-[20px] w-[90%] flex justify-center items-center text-white text-[15px] font-medium rounded-full bg-[#1A021B] py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] lg:px-[52px] transition duration-150 hover:ease-in-out hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:border-[#414141] dark:bg-[#EAEAEA] dark:text-[#171717] dark:hover:bg-white"
                onClick={() =>
                  handleRedeemPerk(
                    perk?.id,
                    perk?.fields["Uses"],
                    perk?.fields["Redemption Link"]
                  )
                }
              >
                Redeem perk
              </a>

              <div className="h-[80px] lg:hidden" />
            </div>
          </div>
          <div className="hidden !mr-[150px] py-[50px] flex-1 flex flex-col justify-between space-y-[60px] lg:flex">
            <div className="flex justify-end gap-[16px]">
              <a
                data-tip
                data-for="website"
                className="w-[48px] h-[48px] border-[#ECEBEC] text-[#9E9E9E] border-[1px] rounded-full flex justify-center items-center cursor-pointer transition duration-150 hover:ease-in-out hover:border-[#1A021B] hover:text-[#1A021B] dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
                onClick={() => router.push(perk?.fields["Website"])}
              >
                <svg
                  className="h-[20px] w-[20px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <rect x="3" y="4" width="18" height="12" rx="1" />
                  <path d="M7 20h10M9 16v4M15 16v4" />
                </svg>
              </a>
              <a
                data-tip
                data-for="twitter"
                className="w-[48px] h-[48px] border-[#ECEBEC] text-[#9E9E9E] border-[1px] rounded-full flex justify-center items-center cursor-pointer transition duration-150 hover:ease-in-out hover:border-[#1A021B] hover:text-[#1A021B] dark:border-[#2E2E2E] dark:bg-[#232323] dark:text-[#8A8A8A] dark:hover:text-white dark:hover:border-white"
                onClick={() => router.push(perk?.fields["Twitter"])}
              >
                <svg
                  className="h-[20px] w-[20px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                </svg>
              </a>
            </div>
            <div>
              <div className="pb-[40px] text-[26px] text-[#171717] dark:text-[#ECECEC]">
                Perk details
              </div>
              <div className="space-y-[4px]">
                <div className="text-[20px] text-[#171717] dark:text-[#ECECEC]">
                  Description
                </div>
                <div className="text-[18px]">
                  {perk?.fields["Perk Description"]}
                </div>
              </div>
              <div className="my-[20px] space-y-[4px]">
                <div className="text-[20px] text-[#171717] dark:text-[#ECECEC]">
                  How to redeem?
                </div>
                <div
                  className="text-[18px] child:list-decimal child:ml-6 child:mt-2"
                  dangerouslySetInnerHTML={{
                    __html: md().render(
                      perk?.fields["Redemption Instructions"]
                    ),
                  }}
                ></div>
              </div>
              <a
                className="flex justify-center items-center text-white text-[15px] font-medium rounded-full bg-[#1A021B] py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] lg:px-[52px] transition duration-150 hover:ease-in-out hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:border-[#414141] dark:bg-[#EAEAEA] dark:text-[#171717] dark:hover:bg-white"
                onClick={() =>
                  handleRedeemPerk(
                    perk?.id,
                    perk?.fields["Uses"],
                    perk?.fields["Redemption Link"]
                  )
                }
              >
                Redeem perk
              </a>
            </div>
          </div>
        </div>
      </PerksLayout>
      {/*@ts-ignore - React tooltip is working on a fix */}
      <ReactTooltip
        id="website"
        place="top"
        effect="solid"
        backgroundColor={
          theme == "dark" || theme == "system" ? "#2B2B2B" : "#1A021B"
        }
        className="!rounded-full"
      >
        <div className="text-white dark:text-[#FFF]/[0.50]">View website</div>
      </ReactTooltip>

      {/*@ts-ignore - React tooltip is working on a fix */}
      <ReactTooltip
        id="twitter"
        place="top"
        effect="solid"
        backgroundColor={
          theme == "dark" || theme == "system" ? "#2B2B2B" : "#1A021B"
        }
        className="!rounded-full"
      >
        <div className="text-white dark:text-[#FFF]/[0.50]">View twitter</div>
      </ReactTooltip>
    </>
  );
};

export default RedeemPage;
