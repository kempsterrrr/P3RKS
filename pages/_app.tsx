import "../styles/globals.css";
import { Provider, createClient } from "wagmi";
import { QueryClient, QueryClientProvider } from "react-query";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
