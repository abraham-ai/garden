import React, { useContext } from 'react'
import type { MouseEvent } from 'react'
import AppContext from '../../../context/AppContext'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import abbreviateAddress from '../../../util/abbreviateAddress'
import abbreviateText from '../../../util/abbreviateText'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import styles from '../../../styles/Header.module.css'

import SettingsMenuPopOver from './SettingsMenuPopOver'
import EthereumVerify from '../EthereumVerify'
// import EthereumAuth from '../EthereumAuth'

import { BsGear } from 'react-icons/bs'

import { Typography, Tooltip, Popover, Button, Select, Space } from 'antd'
const { Text } = Typography


interface ActiveLinkProps {
  children: React.ReactNode
  href: string
}

const ActiveLink = ({ children, href }: ActiveLinkProps): JSX.Element => {
  const router = useRouter()
	const { asPath } = router

  const linkStyle = {
    marginRight: 10,
    color: asPath === href ? 'purple' : 'gray',
    fontWeight: asPath === href ? 'bolder' : 'regular'
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={linkStyle}>
      {children}
    </a>
  )
}

const Header = (): JSX.Element => {
  const router = useRouter()

  const context = useContext(AppContext)
  const isWalletConnected = context?.isWalletConnected || false
  const authToken = context?.authToken || ''
  const userId = context?.userId || ''
  const isSignedIn = context?.isSignedIn || false
  
  const { width } = useWindowDimensions()

  let displayAddress = ''
  if (typeof userId === 'string') {
    displayAddress = abbreviateAddress(userId)
  }

  let displayAuthToken = ''
  if (typeof authToken === 'string') {
    displayAuthToken = abbreviateText(authToken, 80)
  }

  const handleChange = (value: string): void => {
    console.log(`selected ${value}`)
    if (value === 'garden') {
      router.push('/')
    } else {
      router.push(`/${value}`)
    }
  }

  const handleDefaultSelectValue = (): void => {
    const { asPath } = router
    // const { collection } = router.query

    // console.log('handleDefaultSelectValue')
    // console.log({ asPath })
    // console.log({ collection })

    if (asPath === '/') {
      return 'garden'
    } else if (asPath === '/editprofile') {
      return 'editprofile'
    } else if (asPath === '/mycreations') {
      return 'mycreations'
    } else if (asPath === '/mycollections') {
      return 'mycollections'
    } else if (asPath.includes('/collection') === true) {
        return 'mycollections'
    } else {
      return 'garden'
    }
  }

  const handleSelectOptions = (): void => {
    if (isSignedIn === true) {
      return ([
        { value: 'garden', label: 'Garden' },
        { value: 'mycreations', label: 'My Creations' },
        { value: 'mycollections', label: 'Collections' },
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

export default Header
