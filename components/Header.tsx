import { useContext } from 'react';
import AppContext from '../context/AppContext';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import styles from '../styles/Header.module.css';
import EthereumAuth from './EthereumAuth';
// import ConnectButton from './ConnectButton';

interface ActiveLinkProps {
  children: React.ReactNode;
  href: string;
}

function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter();
  const linkStyle = {
    marginRight: 10,
    color: router.asPath === href ? 'purple' : 'gray',
    fontWeight: router.asPath === href ? 'bolder' : 'regular',
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={linkStyle}>
      {children}
    </a>
  );
}

export default function Header() {
  const context = useContext(AppContext);

  const isWalletConnected = context?.isWalletConnected || false;
  const authToken = context?.authToken || '';
  const userId = context?.userId || '';
  const isSignedIn = context?.isSignedIn || false;

  return (
    <header className={styles.headerWrapper}>
      <ul>
        <ActiveLink href='/'>Home</ActiveLink>
        <ActiveLink href='/garden'>Garden</ActiveLink>

        {userId ? (
          <>
            <ActiveLink href='/mycreations'>My Creations</ActiveLink>
            <ActiveLink href='/profile'>Edit Profile</ActiveLink>
          </>
        ) : null}

        <ConnectButton />
      </ul>

      <section className={styles.authSectionStyle}>
        {isWalletConnected && userId ? (
          <p>
            <strong>{'Logged-In as: '}</strong> {userId}
          </p>
        ) : (
          <p>
            <strong>{'Logged-In as: '}</strong>
            {'Not logged in'}
          </p>
        )}

        <div className={styles.signedInStyle}>
          {isSignedIn ? (
            <p>
              <strong>{'Signed-In as: '}</strong> {userId}
            </p>
          ) : (
            <p>
              <strong>{'Signed-In as: '}</strong>
              {'Not Signed-In'}
            </p>
          )}
        </div>

        <div className={styles.authStyle}>
          {authToken && isSignedIn ? (
            <span className={styles.tokenWrapperStyle}>
              <strong>{'AuthToken:'}</strong>
              <span className={styles.authToken}>{authToken}</span>
            </span>
          ) : (
            <span>
              <strong>{'AuthToken:'}</strong>
              {'No AuthToken'}
            </span>
          )}
        </div>
      </section>

      {isWalletConnected ? <EthereumAuth /> : null}
    </header>
  );
}
