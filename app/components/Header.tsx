import { useState } from 'react';

import { useContext } from 'react';
import AppContext from '../../context/AppContext';

import abbreviateAddress from '../../util/abbreviateAddress';
import abbreviateText from '../../util/abbreviateText';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Typography, Tooltip, Popover, Button } from 'antd'
const { Text } = Typography;

import styles from '../../styles/Header.module.css';
import EthereumAuth from './EthereumAuth';

import { BsGear } from 'react-icons/bs';

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

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  let displayAddress = '';
  if (typeof userId === 'string') {
    displayAddress = abbreviateAddress(userId);
  }

  let displayAuthToken = '';
  if (typeof authToken === 'string') {
    displayAuthToken = abbreviateText(authToken, 80);
  }

  const content = (
    <>
      {isWalletConnected ? <EthereumAuth /> : null}

        {isWalletConnected && userId ? (
          <p>
            <strong>{'Logged-In as: '}</strong> {displayAddress}
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
          <strong>{'Signed-In as: '}</strong> {displayAddress}
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
          <span className={styles.authToken}>{displayAuthToken}</span>
        </span>
      ) : (
        <span>
          <strong>{'AuthToken:'}</strong>
          {'No AuthToken'}
        </span>
      )}
    </div>
  </>
);

  return (
    <header className={styles.headerWrapper}>
      <ul className={styles.linksWrapper}>
        <ActiveLink href='/'>
          <Text>{'Garden'}</Text>
        </ActiveLink>

        {/* {userId ? (
          <>
          <ActiveLink href='/mycreations'>My Creations</ActiveLink>
          <ActiveLink href='/profile'>Edit Profile</ActiveLink>
          </>
        ) : null} */}
      </ul>

      <section className={styles.authSectionStyle}>

        <Link href='/' style={{ zIndex: 100 }}>
          <Image src={'/eden-logo-512x512.png'} width={40} height={40} alt={'Eden logo'}/>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Popover content={content} trigger='click' placement='bottom'>
          <Tooltip placement="bottom" title={<span>Settings</span>}>
            <Button type='link' shape='circle' style={{ marginRight: 10 }}>
              <BsGear style={{ fontSize: '1.5rem' }} />
            </Button>
          </Tooltip>
        </Popover>
        <ConnectButton />
        </div>
      </section>
    </header>
  );
}
