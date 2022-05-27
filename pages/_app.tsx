import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import useStore from "../stores/useStore";
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
  const { theme } = useStore((state) => state.user);

  useEffect(() => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Provider client={client}>
      <SWRConfig
        value={{
          fetcher: (resource: any, init: any) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <div className="flex flex-col inset-0 min-h-screen dark:bg-[#1F1F1F] dark:text-[#8A8A8A]">
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
