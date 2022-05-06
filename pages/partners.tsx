import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "../components/Button";

const styles = {
  container:
    "p-5 space-y-5 flex flex-col justify-center lg:items-center lg:flex-row lg:space-x-5",
  column: "space-y-5 text-center md:min-w-[50%] lg:text-left",
  titleContainer: "space-y-1",
  subtitle: "font-bold text-gray-500",
  title: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl",
  info: "text-base text-gray-500 sm:text-xl lg:text-lg xl:text-xl",
  buttonContainer: "h-[90px] space-y-2",
  imageContainer: "md:w-[50%]",
  image: "rounded-md",
};

const Partners: NextPage = () => {
  return (
    <>
      <Head>
        <title>Partners - B3NZ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.column}>
          <div className={styles.titleContainer}>
            <h1 className={styles.subtitle}>DROPPING SOON 👀</h1>
            <h1 className={styles.title}>
              Product distribution directly to people building the future
            </h1>
          </div>
          <p className={styles.info}>
            Get your product, tool or service directly into the hands of
            thousands of DAO contributors building the future.
          </p>
          <div className={styles.buttonContainer}>
            <p>Drop us your details and we will be in touch!</p>
            <Button
              as="link"
              href="https://airtable.com/shrZZn6ZKZfvrUqDX"
              style="!w-full lg:!w-[200px]"
            >
              Become a Partner Fren
            </Button>
          </div>
        </div>
        <div>
          <img
            className={styles.image}
            src="/partners-hero.jpeg"
            alt="cyber world"
          />
        </div>
      </main>
    </>
  );
};

export default Partners;
