import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { MixpanelTracking } from "../services/mixpanel";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  const handleCTA = () => {
    setOpen(true);
    // Add mixpanel call for CTA click
  };

  useEffect(() => {
    MixpanelTracking.getInstance().pageViewed();
  }, []);

  return (
    <>
      <Layout>
        <main className="relative px-7 border-red pt-[30px] grow w-screen">
          <div className="h-full flex flex-col justify-start space-y-24 lg:py-0 lg:w-[958px] lg:mx-auto lg:justify-center lg:text-center lg:space-y-[40px]">
            <div className="flex justify-center lg:hidden">
              <div className="relative -left-3">
                <Image
                  width="35"
                  height="40"
                  src="/home/alchemy-mobile.png"
                  alt="Alchemy logo"
                />
              </div>
            </div>
            <div className="ml-5 relative flex justify-between lg:hidden">
              <Image
                width="98"
                height="95"
                src="/home/decentology-mobile.png"
                alt="Decentology logo"
              />
              <div className="absolute right-10 -top-5">
                <Image
                  width="50"
                  height="57"
                  src="/home/ankr-mobile.png"
                  alt="Ankr logo"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-8 xl:space-y-7 2xl:space-y-9">
              <h1 className="text-4xl text-[#1A021B] leading-tight font-medium sm:leading-10 md:text-6xl md:leading-tight lg:text-8xl xl:text-7xl 2xl:text-8xl lg:leading-none dark:text-[#EAEAEA]">
                Rewards for <br /> DAO Contributors
              </h1>
              <p className="text-2xl font-light leading-normal sm:text-[24px] sm:leading-[34px] md:text-[30px] md:leading-[50px] lg:w-6/12 lg:mx-auto lg:text-xl xl:text-2xl xl:w-7/12 2xl:text-[2rem] 2xl:w-9/12 2xl:leading-10 2xl:font-light">
                Unlock more ways to recognise and reward your DAO&apos;s top
                contributors.
              </p>
              <div className="flex flex-col space-y-[16px] lg:flex-row lg:space-y-0 lg:space-x-[20px] lg:mx-auto">
                <a
                  className="text-center text-white text-[15px] font-medium rounded-full bg-[#1A021B] py-4 px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px]  lg:px-[52px] transition duration-150 hover:ease-in-out hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:border-[#414141] dark:bg-[#EAEAEA] dark:text-[#171717] dark:hover:bg-white"
                  onClick={() => setOpen(true)}
                >
                  Connect wallet
                </a>
                <Link href="https://airtable.com/shrwGFJhHZGw88oC5">
                  <a className="text-center text-[#1A021B] text-[15px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-4 px-14 cursor-pointer sm:text-[16px]  transition duration-150 hover:ease-in-out hover:shadow-[0_0_35px_rgba(0,0,0,0.07)] dark:text-white dark:bg-[#232323] dark:border-[#2E2E2E] dark:hover:border-white">
                    Offer a perk
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <div className="hidden lg:flex absolute top-44 left-[38%]">
          <Image width="39" height="40" src="/home/f.png" alt="f logo" />
        </div>
        <div className="hidden lg:flex absolute top-44 right-[34%]">
          <Image
            width="54"
            height="57"
            src="/home/koinly.png"
            alt="Koinly logo"
          />
        </div>
        <div className="hidden lg:flex absolute top-[25%] left-[17%]">
          <Image
            width="98"
            height="90"
            src="/home/tenderly.png"
            alt="Tenderly logo"
          />
        </div>
        <div className="hidden lg:flex absolute top-[27%] right-[15%]">
          <Image
            width="110"
            height="100"
            src="/home/cryptotax.png"
            alt="Cryptotax logo"
          />
        </div>
        <div className="hidden lg:flex absolute top-[48%] left-[4%]">
          <Image
            width="127"
            height="136"
            src="/home/kubera.png"
            alt="Kubera logo"
          />
        </div>
        <div className="hidden lg:flex absolute top-[48%] right-[4%]">
          <Image
            width="139"
            height="157"
            src="/home/ankr.png"
            alt="Desktop percentage icon two"
          />
        </div>
        <div className="hidden lg:flex absolute -bottom-[0%] left-[13%]">
          <Image
            width="233"
            height="204"
            src="/home/consensys.png"
            alt="Consensys logo"
          />
        </div>
        <div className="hidden lg:flex absolute -bottom-[0%] right-[15%]">
          <Image
            width="250"
            height="180"
            src="/home/decentology.png"
            alt="Decentology logo"
          />
        </div>
        <div className="hidden lg:flex absolute -bottom-[0%] right-[49%]">
          <Image
            width="150"
            height="100"
            src="/home/alchemy.png"
            alt="Alchemy logo"
          />
        </div>
      </Layout>
      <ConnectWalletModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Home;
