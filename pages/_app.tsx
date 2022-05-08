import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { SWRConfig } from "swr";

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors() {
    return [
      new InjectedConnector({
        options: {
          name: "MetaMask",
        },
      }),
      new WalletConnectConnector({
        options: {
          qrcode: true,
        },
      }),
    ];
  },
});

const styles = {
  container: "flex flex-col absolute inset-0",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider client={client}>
      <SWRConfig
        value={{
          fetcher: (resource: any, init: any) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <div id="root" className={styles.container}>
          {/* @ts-ignore: react-dom type issues */}
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
