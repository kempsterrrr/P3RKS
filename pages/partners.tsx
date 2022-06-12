import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";

const Partners: NextPage = () => {
  return (
    <>
      <Head>
        <title>Partners - P3RKS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="p-5 space-y-5 flex flex-col justify-center max-w-[1400px] mx-auto lg:items-center lg:flex-row lg:space-x-5">
          <div className="space-y-5 text-center md:min-w-[50%] lg:text-left">
            <div className="space-y-1">
              <h1 className="font-bold text-gray-500">DROPPING SOON 👀</h1>
              <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
                Product distribution directly to people building the future
              </h1>
            </div>
            <p className="text-base text-gray-500 sm:text-xl lg:text-lg xl:text-xl">
              Get your product, tool or service directly into the hands of
              thousands of DAO contributors building the future.
            </p>
            <div className="h-[90px] space-y-2">
              <p>Drop us your details and we will be in touch!</p>
              <a
                href="https://airtable.com/shrZZn6ZKZfvrUqDX"
                className="!w-full lg:!w-[200px]"
              >
                Become a Partner Fren
              </a>
            </div>
          </div>
          <div>
            <img
              className="md:w-[50%] rounded-md"
              src="/partners-hero.jpeg"
              alt="cyber world"
            />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Partners;
