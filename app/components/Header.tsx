import React, { useState, useContext } from 'react'
import AppContext from '../../context/AppContext'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useWindowDimensions from '../../hooks/useWindowDimensions'
import abbreviateAddress from '../../util/abbreviateAddress'
import abbreviateText from '../../util/abbreviateText'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Typography, Tooltip, Popover, Button, Select, Space } from 'antd'
const { Text, Paragraph } = Typography

import styles from '../../styles/Header.module.css'
import EthereumAuth from './EthereumAuth'

import { BsGear } from 'react-icons/bs'

interface ActiveLinkProps {
  children: React.ReactNode
  href: string
}

function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter()
  const linkStyle = {
    marginRight: 10,
    color: router.asPath === href ? 'purple' : 'gray',
    fontWeight: router.asPath === href ? 'bolder' : 'regular',
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    router.push(href)
  }



  return (
    <a href={href} onClick={handleClick} style={linkStyle}>
      {children}
    </a>
  )
}

export default function Header() {
  const context = useContext(AppContext)

  const router = useRouter()

  const isWalletConnected = context?.isWalletConnected || false
  const authToken = context?.authToken || ''
  const userId = context?.userId || ''
  const isSignedIn = context?.isSignedIn || false

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { width = 0 } = useWindowDimensions()

  let displayAddress = ''
  if (typeof userId === 'string') {
    displayAddress = abbreviateAddress(userId)
  }

  let displayAuthToken = ''
  if (typeof authToken === 'string') {
    displayAuthToken = abbreviateText(authToken, 80)
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
    if (value === 'garden') {
      router.push('/')
    } else {
      router.push(`/${value}`)
    }
  }

  const handleDefaultSelectValue = () => {
    if (router.asPath === '/') {
      return 'garden'
    } else if (router.asPath === '/editprofile') {
      return 'editprofile'
    } else if (router.asPath === '/mycreations') {
      return 'mycreations'
    } else if (router.asPath === '/about') {
      return 'about'
    } else {
      return 'garden'
    }
  }

  const content = (
    <>
      {isWalletConnected ? <EthereumAuth /> : null}

      {isWalletConnected && userId ? (
          <Paragraph>
            <strong>{'Logged-In as: '}</strong> {displayAddress}
          </Paragraph>
        ) : (
          <Paragraph>
            <strong>{'Logged-In as: '}</strong>
            {'Not logged in'}
          </Paragraph>
        )}
      <div className={styles.signedInStyle}>
    {isSignedIn ? (
        <Paragraph>
          <strong>{'Signed-In as: '}</strong> {displayAddress}
        </Paragraph>
      ) : (
        <Paragraph>
          <strong>{'Signed-In as: '}</strong>
          {'Not Signed-In'}
        </Paragraph>
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
  )

  return (
    <header className={styles.headerWrapper}>
      <ul className={styles.linksWrapper}>
        


        {width > 1280 ? (
          <>
            <ActiveLink href='/'>
              <Text>{'Garden'}</Text>
            </ActiveLink>
          {userId ? (
            <>
            <ActiveLink href='/mycreations'>
              <Text>{'My Creations'}</Text>
            </ActiveLink>
            <ActiveLink href='/profile'>
              <Text>{'Edit Profile'}</Text>
            </ActiveLink>
            </>
          ) : null}
          </>
        ): (
          <Space wrap>
          <Select
            className='navbarSelect'
            defaultValue={handleDefaultSelectValue()}
            style={{ width: 150, border: 'none' }}
            onChange={handleChange}
            options={[
              { value: 'garden', label: 'Garden' },
              { value: 'about', label: 'About' },
              { value: 'mycreations', label: 'My Creations' },
              { value: 'editprofile', label: 'Edit Profile' }
            ]}
          />
        </Space>
        )}



        
      </ul>

      <section className={styles.authSectionStyle}>

        <Link href='/' style={{ zIndex: 100 }}>
          <Image src={'/eden-logo-512x512.png'} width={40} height={40} alt={'Eden logo'}/>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Popover content={content} trigger='click' placement='bottom'>
          {/* <Tooltip placement="bottom" title={<span>Settings</span>}> */}
            <Button type='link' shape='circle' style={{ marginRight: 10 }}>
              <BsGear style={{ fontSize: '1.5rem' }} />
            </Button>
          {/* </Tooltip> */}
        </Popover>
        <ConnectButton />
        </div>
      </section>
    </header>
  )
}
