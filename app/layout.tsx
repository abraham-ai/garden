'use client';

import './styles/globals.css';
import React, { FC, ReactNode, useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import AppContextType from '../interfaces/AppContext';

// import Router from 'next/navigation';
// import nProgress from 'nprogress';
// import 'nprogress/nprogress.css';

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

import './styles/globals.css';
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

interface PageAppProps extends AppProps {
  children: ReactNode;
}

const CustomAvatar: AvatarComponent = ({ address }) => {
  return <Blockies seed={address} />;
};

const App: FC<PageAppProps> = ({ children, Component, pageProps }) => {
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
  // Router.events.on('routeChangeStart', nProgress.start);
  // Router.events.on('routeChangeError', nProgress.done);
  // Router.events.on('routeChangeComplete', nProgress.done);

  useEffect(() => {
    setIsWalletConnected(isConnected);
    setUserId(address ? `${address}` : '');
  }, [isConnected, setIsWalletConnected, address, setUserId, userId]);

  return (
    <AppContext.Provider value={{...contextValues, setCreationsData: undefined, creations: undefined, creationIndex: undefined, setCurrentCreationIndex: undefined, authToken: authToken, currentCreationIndex: undefined, collections: undefined, setCollections: undefined, selectedCollection: undefined, creationsLoad: false as unknown as () => void, setSelectedCollection: undefined, collectionModalView: undefined, setCollectionModalView: undefined }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider avatar={CustomAvatar} chains={chains}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </AppContext.Provider>
  );
};

export default App;


// 'use client';

// import React, { FC, ReactNode } from 'react';

// interface LayoutProps {
//   children: ReactNode;
// }

// const GardenLayout: FC<LayoutProps> = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   return <div className='garden-layout-wrapper'>{children}</div>;
// };

// export default GardenLayout;
