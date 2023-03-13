'use client';

import { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import AppContext from '../context/AppContext';
import { useAccount, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import axios from 'axios';
import userIdType from '../interfaces/AppContext';
import styles from '../styles/EthereumAuth.module.css';

const EthereumAuth = () => {
  const context = useContext(AppContext);

  const isWalletConnected = context?.isWalletConnected || false;

  const setIsWalletConnected = useMemo(() => {
    return context?.setIsWalletConnected || (() => {});
  }, [context?.setIsWalletConnected]);

  const authToken = context?.authToken || '';

  const setAuthToken = useMemo(() => {
    return context?.setAuthToken || (() => {});
  }, [context?.setAuthToken]);

  const userId = context?.userId || '';

  const setUserId = useMemo(() => {
    return context?.setUserId || (() => {});
  }, [context?.setUserId]);

  const isSignedIn = context?.isSignedIn || false;

  const setIsSignedIn = useMemo(() => {
    return context?.setIsSignedIn || (() => {});
  }, [context?.setIsSignedIn]);

  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
    authToken?: string;
  }>({});

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const { signMessage } = useSignMessage({
    onSuccess: async (data, variables) => {
      console.log({ address });
      try {
        console.info('/api/login !');
        console.info({
          message: variables.message,
          signature: data,
          userAddress: address,
        });
        const resp = await axios.post('/api/auth/verify', {
          message: variables.message,
          signature: data,
          userAddress: address,
        });
        console.info(resp.data);
        const { token } = resp.data;
        if (token) {
          console.info('got token', token);
          setIsSignedIn(true);
          setAuthToken(token);
          setIsSignedIn(true);
        }
      } catch (error: any) {
        console.info('error!', error);
        // setEthMessage('Error authenticating');
      }
      // setEthAuthenticating(false);
    },
  });

  const handleSiwe = useCallback(async () => {
    if (!isConnected) return;
    // setEthAuthenticating(true);
    try {
      const nonceRes = await fetch('/api/auth/nonce');
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await nonceRes.text(),
      });
      console.log(message);
      const preparedMessage = message.prepareMessage();
      console.info('sign message 1');
      await signMessage({
        message: preparedMessage,
      });
      console.info('sign message 2');
    } catch (error: any) {
      console.log(error);
      // setEthMessage('Error authenticating');
      // setEthAuthenticating(false);
    }
  }, [address, chain, isConnected, signMessage]);

  // Fetch user when:
  useEffect(() => {
    if (!isWalletConnected && isConnected) {
      setIsWalletConnected(true);
      setUserId(address ? `0x${address}` : '');
    }

    const handler = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const json = await res.json();

        const { token, userId } = json;

        if (typeof token !== 'undefined' && typeof userId !== 'undefined') {
          setIsSignedIn(true);
          setAuthToken(token);
          setUserId(`0x${userId}`);
        }
      } catch (_error) {}
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, [
    isWalletConnected,
    setIsWalletConnected,
    isConnected,
    address,
    setAuthToken,
    setUserId,
    setIsSignedIn,
  ]);

  if (isWalletConnected) {
    return (
      <>
        <section className={styles.ethereumAuthWrapper}>
          {/* Account content goes here */}

          {typeof userId === 'string' && isSignedIn ? (
            <div>
              <button
                onClick={async () => {
                  // await fetch('/api/auth/logout');
                  // setAuthToken('');
                  // setUserId('');
                  // setIsSignedIn(false);
                  disconnect();
                }}
              >
                {'Disconnect Wallet'}
              </button>
            </div>
          ) : (
            <button disabled={state.loading} onClick={handleSiwe}>
              {'Sign-In with Ethereum'}
            </button>
          )}

          {typeof userId === 'string' && isSignedIn ? (
            <button
              onClick={async () => {
                await fetch('/api/auth/logout');
                setAuthToken('');
                setIsSignedIn(false);
              }}
            >
              {'Sign-out of Eden'}
            </button>
          ) : null}
        </section>
      </>
    );
  }

  return <div>{/* Connect wallet content goes here */}</div>;
};

export default EthereumAuth;
