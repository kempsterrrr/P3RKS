import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

const styles = {
  container: "flex grow",
};

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
