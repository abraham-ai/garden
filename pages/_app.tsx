import { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext/AppContext';

import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  useAccount,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import {
  RainbowKitProvider,
  AvatarComponent,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import Blockies from 'react-blockies';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

console.log(process.env.NEXT_PUBLIC_WALLET_CONNECT_ID);

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Eden Art AI',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
});

const CustomAvatar: AvatarComponent = ({ address }) => {
  return <Blockies seed={address} />;
};

export default function App({ Component, pageProps }: AppProps) {
  const [isWeb3WalletConnected, setIsWeb3WalletConnected] = useState(false);
  const [isWeb3AuthSuccess, setIsWeb3AuthSuccess] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [userId, setUserId] = useState('');

  const context = useContext(AppContext);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  const contextValues = {
    authToken,
    setAuthToken,
    isWeb3WalletConnected,
    setIsWeb3WalletConnected,
    isWeb3AuthSuccess,
    setIsWeb3AuthSuccess,
  };

  const { isConnected } = useAccount();

  useEffect(() => {
    setIsWeb3WalletConnected(isConnected);
  }, [isConnected, setIsWeb3WalletConnected]);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider avatar={CustomAvatar} chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
