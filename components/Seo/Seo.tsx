import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
};

const Seo = ({
  title = "P3RKS | Rewards for DAO Contributors",
  description = "Unlock more ways to recognise and reward your DAOs top contributors.",
  ogTitle = "P3RKS | Rewards for DAO Contributors",
  ogType,
  ogUrl,
  ogImage,
}: SeoProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="og:title" content={ogTitle} />
      <meta name="og:url" content={ogUrl} />
      <meta name="og:type" content={ogType} />
      <meta name="og:image" content={ogImage ? ogImage : "/twitter-card.png"} />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
