import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import AppContextType from '../interfaces/AppContext';

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
});

const CustomAvatar: AvatarComponent = ({ address }) => {
  return <Blockies seed={address} />;
};

export default function App({ Component, pageProps }: AppProps) {
  // wagmi wallet hooks
  const { isConnected, address } = useAccount();

  // auth context
  const [isWalletConnected, setIsWalletConnected] = useState<
    boolean | undefined
  >(undefined);
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(false);
  const [authToken, setAuthToken] = useState<string | undefined>('');
  const [userId, setUserId] = useState<string | undefined>('');

  // creation context
  const [creationsData, setCreationsData] = useState<object[]>([]);
  const [creationsLoading, setCreationsLoading] = useState<boolean>(false);
  const [creationsMore, setCreationsMore] = useState<boolean>(true);
  const [creationsLoad, setCreationsLoad] = useState<boolean>(false);

  // init context
  const context = useContext(AppContext);
  const contextValues = {
    authToken,
    setAuthToken,
    isWalletConnected,
    setIsWalletConnected,
    isSignedIn,
    setIsSignedIn,
    userId,
    setUserId,
    creationsLoading,
    creationsData,
    creationsMore,
    creationsLoad,
  };

  // routing progress bar
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  useEffect(() => {
    setIsWalletConnected(isConnected);
    setUserId(address ? `${address}` : '');
  }, [isConnected, setIsWalletConnected, address, setUserId, userId]);

  return (
    <>
      <AppContext.Provider value={contextValues}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider avatar={CustomAvatar} chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </AppContext.Provider>
    </>
  );
}
