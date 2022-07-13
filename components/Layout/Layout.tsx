import Head from "next/head";
import { LayoutProps } from "./Layout.d";
import { useGetUser } from "../../hooks/useGetUser";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import { Cookies } from "../Cookies";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useGetUser("/perks");
  return (
    <>
      <Head>
        <title>P3RKS | Rewards for DAO Contributors</title>
        <meta
          name="description"
          content="P3RKS | Rewards for DAO Contributors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="flex grow">{children}</div>
      <Cookies />
      <Footer />
    </>
  );
};

export default Layout;
