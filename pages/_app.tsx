import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const styles = {
    container: "min-h-screen flex flex-col",
    body: "max-w-[1400px] mx-auto grow",
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <hr />
      <div className={styles.body}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
