'use client';

import { useState, useCallback, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

const EthereumAuth = () => {
  const context = useContext(AppContext);
  const { isWalletConnected } = context;

  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const { signMessageAsync } = useSignMessage();

  const signIn = useCallback(async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch('/api/auth/nonce');
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error('Error verifying message');

      setState((x) => ({ ...x, address, loading: false }));
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false }));
    }
  }, []);

  // Fetch user when:
  useEffect(() => {
    if (!isWalletConnected && isConnected) {
      setIsWalletConnected(true);
    }

    const handler = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
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

        {state.address ? (
          <div>
            <div>Signed in as {state.address}</div>
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
          <button disabled={state.loading} onClick={signIn}>
            Sign-In with Ethereum
          </button>
        )}
      </div>
    );
  }

  return <div>{/* Connect wallet content goes here */}</div>;
};

export default EthereumAuth;
