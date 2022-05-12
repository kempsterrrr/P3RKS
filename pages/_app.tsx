import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider client={client}>
      <SWRConfig
        value={{
          fetcher: (resource: any, init: any) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <div className="flex flex-col absolute inset-0">
          {/* @ts-ignore: react-dom type issues */}
          <Component {...pageProps} />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
