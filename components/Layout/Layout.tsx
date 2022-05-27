import { LayoutProps } from "./Layout.d";
import { useGetUser } from "../../hooks/useGetUser";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useGetUser("/perks");
  return (
    <>
      <NavBar />
      <div className="flex grow">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
