import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const styles = {
  container: "min-h-screen flex flex-col",
  body: "max-w-[1400px] mx-auto flex grow",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.body}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
