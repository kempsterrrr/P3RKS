import { LayoutProps } from "./Layout.d";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

const styles = {
  container: "flex grow",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
