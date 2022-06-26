import "../styles/globals.css";
import "pro-gallery/dist/statics/main.css";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import type { AppProps } from "next/app";
import { useTheme } from "../hooks/useTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Carousel/index.css";

const infuraId = process.env.PUBLIC_NEXT_INFURA_ID;

const { chains, provider } = configureChains(defaultChains, [
  infuraProvider({ infuraId }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
});

function MyApp({ Component, pageProps, fallback }: AppProps) {
  useTheme();

  const contextClass = {
    default: "",
    warning: "!bg-[#FFEFEF] !text-[#FF6A6A] border-[#FFDCDC]",
  };

  return (
    <WagmiConfig client={client}>
      <div className="flex flex-col inset-0 min-h-screen dark:bg-[#1F1F1F] dark:text-[#8A8A8A]">
        {/* @ts-ignore: react-dom type issues */}
        <Component {...pageProps} />
      </div>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " mb-3 relative text-[18px] text-center text-white font-[500] px-[48px] py-[7px] min-h-10 rounded-[16px] flex justify-between overflow-hidden cursor-pointer bg-[#F1FFF3] text-[#11D100] border-[1px] border-[#D7FFD8] dark:bg-[#53A560]/[0.08] dark:text-[#0DA100] dark:border-[#133C15]/[0.30]"
        }
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        closeButton={false}
      />
    </WagmiConfig>
  );
}

export default MyApp;
