import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors() {
    return [new InjectedConnector()];
  },
});

const styles = {
  container: "min-h-screen flex flex-col",
  body: "max-w-[1400px] mx-auto flex grow",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider client={client}>
      <div id="root" className={styles.container}>
        <NavBar />
        <div className={styles.body}>
          {/* @ts-ignore: react-dom type issues */}
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;
