import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi';
import styles from '../styles/Header.module.css';
import EthereumAuth from './EthereumAuth';

interface ActiveLinkProps {
  children: React.ReactNode;
  href: string;
}

function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'purple' : 'black',
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
  return (
    <header>
      <ul>
        <ActiveLink href='/'>Home</ActiveLink>
        <ActiveLink href='/garden'>Garden</ActiveLink>
        <ActiveLink href='/mycreations'>My Creations</ActiveLink>
        <ActiveLink href='/profile'>Edit Profile</ActiveLink>
      </ul>

      <EthereumAuth />
    </header>
  );
}
