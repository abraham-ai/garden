import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import abbreviateAddress from '../../../util/abbreviateAddress'
import abbreviateText from '../../../util/abbreviateText'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Typography, Tooltip, Popover, Button, Select, Space } from 'antd'
const { Text, Paragraph } = Typography

import styles from '../../../styles/Header.module.css'

import SettingsMenuPopOver from './SettingsMenuPopOver'
import EthereumAuth from '../EthereumAuth'
import EthereumVerify from '../EthereumVerify'

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

  const { width } = useWindowDimensions()

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

  const handleSelectOptions = () => {
    if (isSignedIn === true) {
      return ([
        { value: 'garden', label: 'Garden' },
        { value: 'mycreations', label: 'My Creations' },
        { value: 'editprofile', label: 'Edit Profile' }
      ])
    } else {
      return ([
        { value: 'garden', label: 'Garden' }
      ])
    }
  }

  return (
    <header className={styles.headerWrapper}>
      <ul className={styles.linksWrapper}>
        <EthereumVerify />

        { width > 1280
          ? (
              <>
                <ActiveLink href='/'>
                  <Text>{'Garden'}</Text>
                </ActiveLink>
                {userId !== 'undefined'
                  ? (
                      <>
                        <ActiveLink href='/mycreations'>
                          <Text>{'My Creations'}</Text>
                        </ActiveLink>
                        <ActiveLink href='/profile'>
                          <Text>{'Edit Profile'}</Text>
                        </ActiveLink>
                      </>
                    )
                  : null }
              </>
            )
          : (
						isSignedIn === true
							? 
                  (
                    <Space wrap>
                      <Select
                        className='navbarSelect'
                        defaultValue={handleDefaultSelectValue()}
                        style={{ width: 150, border: 'none' }}
                        onChange={handleChange}
                        options={handleSelectOptions()}
                        />
                    </Space>
                  )
                : (
                  <ActiveLink href='/'>
										<Text>{'Garden'}</Text>
									</ActiveLink>
                )
              
          )}
      </ul>

      <section className={styles.authSectionStyle}>
        <Link href='/' style={{ zIndex: 100 }}>
          <Image src={'/eden-logo-512x512.png'} width={40} height={40} alt={'Eden logo'}/>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Popover
              content={<SettingsMenuPopOver
                isWalletConnected={isWalletConnected}
                userId={userId}
                displayAddress={displayAddress}
                isSignedIn={isSignedIn}
                authToken={authToken}
                displayAuthToken={displayAuthToken}
              />}
              trigger='click'
              placement='bottom'
            >
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
