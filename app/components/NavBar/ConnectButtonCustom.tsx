'use client'

import React, { useState } from 'react'
import type { FC } from 'react'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import Blockies from 'react-blockies'

import { Typography, Button, Avatar, Modal } from 'antd'

const { Text } = Typography

interface ProfileButtonProps {
	isMounted: boolean
	isMobile: boolean
}

export const ProfileButton: FC<ProfileButtonProps> = ({
	isMobile,
	isMounted,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { address } = useAccount()
	const walletAddress = address

	let displayAddress = walletAddress
		? walletAddress?.slice(0, 6)
		: walletAddress

	displayAddress = walletAddress
		? (displayAddress += '...' + walletAddress.slice(-4))
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

							// if (chain.unsupported) {
							// 	return (
							// 		<Button onClick={openChainModal} type='button'>
							// 			{'Wrong network'}
							// 		</Button>
							// 	)
							// }

							return (
								<div style={{ display: 'flex', gap: 12 }}>
									{/* <Popover
										content={
											<>
												<Button
													onClick={openChainModal}
													style={{ display: 'flex', alignItems: 'center' }}
													type='button'
												>
													{chain.hasIcon && (
														<div
															style={{
																background: chain.iconBackground,
																width: 12,
																height: 12,
																borderRadius: 999,
																overflow: 'hidden',
																marginRight: 4,
															}}
														>
															{chain.iconUrl && (
																<img
																	alt={chain.name ?? 'Chain icon'}
																	src={chain.iconUrl}
																	style={{ width: 12, height: 12 }}
																/>
															)}
														</div>
													)}
													{chain.name}
												</Button>

												<Button onClick={openAccountModal} type='button'>
													{account.displayName}
													{account.displayBalance
														? ` (${account.displayBalance})`
														: ''}
												</Button>
											</>
										}
									> */}
									<Button
										onClick={openAccountModal}
										type='default'
										shape={isMobileMounted ? 'circle' : 'round'}
										size='large'
										style={{
											padding: isMobileMounted ? 0 : '6px 10px 10px 10px',
										}}
									>
										{!isMobile && displayAddress !== null ? (
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

export default ProfileButton
