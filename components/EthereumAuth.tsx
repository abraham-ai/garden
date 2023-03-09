'use client';

import { useState, useCallback, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import axios from 'axios';

const EthereumAuth = () => {
  const context = useContext(AppContext);

  const isWalletConnected = context?.isWalletConnected || false;
  const setIsWalletConnected = context?.setIsWalletConnected || (() => {});
  const authToken = context?.authToken || '';
  const setAuthToken = context?.setAuthToken || (() => {});
  const userId = context?.userId || '';
  const setUserId = context?.setUserId || (() => {});
  const isSignedIn = context?.isSignedIn || false;
  const setIsSignedIn = context?.setIsSignedIn || (() => {});

  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
    authToken?: string;
  }>({});

  const { address, isConnected } = useAccount();
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

  const handleSiwe = async () => {
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
  };

  // Fetch user when:
  useEffect(() => {
    if (!isWalletConnected && isConnected) {
      setIsWalletConnected(true);
      setUserId(address ? `0x${address}` : '');
    }

    const handler = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();

        setAuthToken(json.token);
        setUserId(json.userId);
        // setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {}
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, [isWalletConnected, isConnected]);

  if (isWalletConnected) {
    return (
      <div>
        {/* Account content goes here */}

        {userId ? (
          <div>
            <div>Signed in as {userId}</div>
            <button
              onClick={async () => {
                await fetch('/api/auth/logout');
                setState({});
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button disabled={state.loading} onClick={handleSiwe}>
            Sign-In with Ethereum
          </button>
        )}
      </div>
    );
  }

  return <div>{/* Connect wallet content goes here */}</div>;
};

export default EthereumAuth;
