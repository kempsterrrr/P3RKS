import { LayoutProps } from "./Layout.d";
import { useGetUser } from "../../hooks/useGetUser";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useGetUser("/perks");
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex grow">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
