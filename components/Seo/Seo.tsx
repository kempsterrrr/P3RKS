import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  robots?: string;
};

const Seo = ({
  title = "P3RKS | Rewards for DAO Contributors",
  description = "Unlock more ways to recognise and reward your DAO's top contributors.",
  ogTitle = "P3RKS | Rewards for DAO Contributors",
  ogType,
  ogUrl,
  ogImage,
  robots,
}: SeoProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="og:title" content={ogTitle} />
      <meta name="og:url" content={ogUrl} />
      <meta name="og:type" content={ogType} />
      <meta name="og:image" content={ogImage ? ogImage : "/twitter-card.png"} />
      {process.env.NODE_ENV == "production" && !robots ? null : (
        <meta name="robots" content={robots} />
      )}
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
