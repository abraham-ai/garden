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
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'purple' : 'gray',
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default function Header() {
  const context = useContext(AppContext);
  const { isWalletConnected } = context;

  return (
    <header>
      <ul>
        <ActiveLink href='/'>Home</ActiveLink>
        <ActiveLink href='/garden'>Garden</ActiveLink>
        <ActiveLink href='/mycreations'>My Creations</ActiveLink>
        <ActiveLink href='/profile'>Edit Profile</ActiveLink>
        <ConnectButton />
      </ul>

      {isWalletConnected ? <EthereumAuth /> : null}
    </header>
  );
}
