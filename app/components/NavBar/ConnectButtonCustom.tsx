'use client'

import React, { useState } from 'react'
import type { FC } from 'react'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import Blockies from 'react-blockies'

import { Typography, Button, Avatar, Modal } from 'antd'

const { Text } = Typography

interface ConnectButtonCustomProps {
	isMounted: boolean
	isMobile: boolean
}

export const ConnectButtonCustom: FC<ConnectButtonCustomProps> = ({
	isMobile,
	isMounted,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { address } = useAccount()
	const walletAddress = address

	const isWalletAddress =
		typeof walletAddress !== 'undefined' && walletAddress.length > 0

	let displayAddress = isWalletAddress
		? walletAddress?.slice(0, 6)
		: walletAddress

	displayAddress = isWalletAddress
		? `${String(displayAddress)}...${String(walletAddress.slice(-4))}`
		: walletAddress

	const isMobileMounted = isMobile && isMounted

	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== 'loading'
				const connected =
					ready &&
					account != null &&
					chain != null &&
					(!authenticationStatus || authenticationStatus === 'authenticated')

				// console.log({ connected })

				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										type='primary'
										onClick={openConnectModal}
										shape={'round'}
										size='large'
									>
										<Text style={{ color: 'white' }}>
											{isMobileMounted ? 'Connect' : 'Connect Wallet'}
										</Text>
									</Button>
								)
							}

							return (
								<div style={{ display: 'flex', gap: 12 }}>
									<Button
										onClick={openAccountModal}
										type='default'
										shape={isMobileMounted ? 'circle' : 'round'}
										size='large'
										style={{
											padding: isMobileMounted ? 0 : '6px 10px 10px 10px',
										}}
									>
										{!isMobileMounted && displayAddress !== null ? (
											<Text style={{ marginRight: 10 }}>
												{account.displayName}
												{typeof account.displayBalance !== 'undefined'
													? ` (${account.displayBalance})`
													: ''}
											</Text>
										) : null}

										<Avatar
											size={isMobileMounted ? 34 : 22}
											src={
												<Blockies
													seed={String(address)}
													scale={isMobileMounted ? 4 : 2.5}
												/>
											}
										/>
									</Button>
									{/* </Popover> */}

									{/* <div className='account-profile-wrapper'>
										<Blockies seed={address} scale={6} />
									</div> */}
									<Modal open={isOpen} footer={<></>}>
										<div className='modal-wrapper'>
											<Button onClick={openAccountModal} type='primary'>
												<Text>{account.displayName}</Text>
												{typeof account.displayBalance !== 'undefined' ? (
													<Text>{` (${account.displayBalance})`}</Text>
												) : null}
											</Button>
										</div>
									</Modal>
								</div>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}

export default ConnectButtonCustom
