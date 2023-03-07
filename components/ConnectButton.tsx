'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import useIsMounted from '../hooks/useIsMounted';

const ConnectButton = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { address, connector, isConnected, isReconnecting } = useAccount();
  const { ensAvatar } = useEnsAvatar({ address });
  const { ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isWalletConnected !== isConnected) {
      setIsWalletConnected(isConnected);
    }
  }, [isConnected, isWalletConnected]);

  console.log({
    connector,
    connect,
    connectors,
    error,
    isLoading,
    pendingConnector,
    isConnected,
    isWalletConnected,
  });

  if (isWalletConnected) {
    return (
      <div>
        <Image src={ensAvatar} alt='ENS Avatar' />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        {typeof connector !== 'undefined' ? (
          <div>Connected to {connector.name}</div>
        ) : null}
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={
            !connector.ready ||
            isReconnecting ||
            connector?.ready === connector.id
          }
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.id === 'injected'
            ? isMounted
              ? connector.name
              : connector.id
            : connector.name}{' '}
          {isMounted && !connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && '…'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectButton;
