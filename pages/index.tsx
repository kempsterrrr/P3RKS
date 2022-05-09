import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { ConnectWalletModal } from "../components/ConnectWalletModal";

const styles = {
  container: "relative p-[30px] grow w-screen",
  contentContainer:
    "flex flex-col justify-end space-y-[40px] lg:py-0 lg:w-[958px] lg:mx-auto lg:justify-center lg:text-center lg:space-y-[40px]",
  mobilePercentageIconsContainer: "relative flex justify-between lg:hidden",
  mobilePercentageIconOneContainer: "flex justify-center lg:hidden",
  mobilePercentageIconOne: "relative -left-3 w-[30px] h-[41px]",
  mobilePercentageIconTwo: "w-[70px] h-[55px]",
  mobilePercentageIconThree: "absolute right-0 -top-5 w-[67.27px] h-[67.94px]",
  title:
    "text-[32px] text-[#1A021B] leading-[38px] font-medium sm:text-[36px] sm:leading-[42px] md:text-[62px] md:leading-[68px] lg:text-[100px] lg:leading-[106px]",
  slogan:
    "text-[20px] text-[#908C91] leading-[30px] sm:text-[24px] sm:leading-[34px] md:text-[30px] md:leading-[50px] lg:w-[616px] lg:mx-auto lg:text-[28px] lg:leading-[48px]",
  buttonsContainer:
    "flex flex-col space-y-[16px] lg:flex-row lg:space-y-0 lg:space-x-[20px] lg:mx-auto",
  blackButton:
    "text-center text-white text-[15px] font-medium rounded-full bg-[#1A021B] py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] lg:py-[21px] lg:px-[52px] hover:shadow-[0_0_35px_rgba(0,0,0,0.25)]",
  outlineButton:
    "text-center text-[#1A021B] text-[15px] font-medium rounded-full border-[1px] border-[#1a021b]/15 py-[18px] px-[48px] cursor-pointer sm:text-[16px] lg:text-[18px] lg:py-[21px] px-[52px] hover:shadow-[0_0_35px_rgba(0,0,0,0.07)]",
  desktopPercentageIconOne:
    "hidden lg:flex absolute bottom-20 left-32 w-[201px] h-[203px]",
  desktopPercentageIconTwo:
    "hidden lg:flex absolute top-96 right-14 w-[129px] h-[101px]",
  desktopPercentageIconThree:
    "hidden lg:flex absolute bottom-0 right-36 w-[247px] h-[247px]",
  desktopPercentageIconFour:
    "hidden lg:flex absolute top-44 left-80 w-[64px] h-[86px]",
};

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>B3NZ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.container}>
          <div className={styles.mobilePercentageIconOneContainer}>
            <img
              className={styles.mobilePercentageIconOne}
              src="percentage-icon-four.png"
            />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.mobilePercentageIconsContainer}>
              <img
                className={styles.mobilePercentageIconTwo}
                src="percentage-icon-two.png"
              />
              <img
                className={styles.mobilePercentageIconThree}
                src="percentage-icon-one.png"
              />
            </div>
            <h1 className={styles.title}>
              Benefits for <br /> DAO contributors
            </h1>
            <p className={styles.slogan}>
              Heavy discounts to products you’ll love, just for being a part of
              your DAO.
            </p>
            <div className={styles.buttonsContainer}>
              <a className={styles.blackButton} onClick={() => setOpen(true)}>
                View benefits
              </a>
              <a className={styles.outlineButton}>Offer benefits</a>
            </div>
          </div>
        </main>
        <img
          className={styles.desktopPercentageIconOne}
          src="percentage-icon-one.png"
        />
        <img
          className={styles.desktopPercentageIconTwo}
          src="percentage-icon-two.png"
        />
        <img
          className={styles.desktopPercentageIconThree}
          src="percentage-icon-three.png"
        />
        <img
          className={styles.desktopPercentageIconFour}
          src="percentage-icon-four.png"
        />
      </Layout>
      <ConnectWalletModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Home;
