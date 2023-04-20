'use client'

import React, { useState } from 'react'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

// CONTEXT
// import AppContext from '@/context/AppContext/AppContext'

// LIBS
import Blockies from 'react-blockies'

// CSS
// import ProfileButtonStyles from '@/components/Account/ProfileButton/ProfileButtonStyles'

// FETCH
// import axios from 'axios'

import { Typography, Button, Avatar, Popover, Modal } from 'antd'
const { Text } = Typography

export const ProfileButton = () => {
	// const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { width } = useWindowDimensions()
	// HOOKS
	const { address } = useAccount()
	const walletAddress = address

	// CONTEXT
	// const context = useContext(AppContext)
	// const {
	//   // authToken,
	//   // isWeb3WalletConnected,
	//   // isWeb3AuthSuccess,
	//   // setAuthToken,
	//   // setIsWeb3WalletConnected,
	//   // setIsWeb3AuthSuccess,
	//   userId,
	//   setUserId,
	// } = context

	// const handleOpenChange = (newOpen: boolean) => {
	//   setOpen(newOpen)
	// }

	// console.log('CONNECT BUTTON CUSTOM')
	// console.log({ userId, isWeb3WalletConnected, isWeb3AuthSuccess })

	// const id = open ? 'account-popover' : undefined

	// const [isHover, setIsHover] = useState(false)

	let displayAddress = walletAddress
		? walletAddress?.slice(0, 6)
		: walletAddress

	displayAddress = walletAddress
		? (displayAddress += '...' + walletAddress.slice(-4))
		: walletAddress

	// const checkAuthToken = useCallback(async () => {
	//   // console.log('CHECK AUTH TOKEN - USE CALLBACK')
	//   const response = await axios.post('/api/user', {})

	//   if (response.data.message === 'Session Cookie Found') {
	//     const { token, userId } = response.data

	//     setIsWeb3AuthSuccess(true)
	//     setAuthToken(token)
	//     setUserId(userId)
	//     // console.log({ userId, token })
	//   }
	// }, [setAuthToken, setUserId, setIsWeb3AuthSuccess])

	// useEffect(() => {
	//   if (isWeb3WalletConnected === false && isConnected === true) {
	//     setIsWeb3WalletConnected(isConnected)
	//   } else if (typeof isConnected === 'undefined' || isConnected === false) {
	//     setIsWeb3WalletConnected(false)
	//     setIsWeb3AuthSuccess(false)
	//     setUserId('')
	//     setAuthToken('')
	//   } else if (isWeb3WalletConnected === true && isWeb3AuthSuccess === false) {
	//     checkAuthToken()
	//   }
	// }, [
	//   isConnected,
	//   setAuthToken,
	//   userId,
	//   setUserId,
	//   isWeb3WalletConnected,
	//   setIsWeb3WalletConnected,
	//   isWeb3AuthSuccess,
	//   setIsWeb3AuthSuccess,
	//   checkAuthToken,
	// ])

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
									<Button type='primary' onClick={openConnectModal}>
										<Text style={{ color: 'white' }}>{'Connect Wallet'}</Text>
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
										shape='round'
									>
										{width > 768 && displayAddress !== null ? (
											<Text style={{ marginRight: 10 }}>
												{account.displayName}
												{typeof account.displayBalance !== 'undefined'
													? ` (${account.displayBalance})`
													: ''}
											</Text>
										) : null}
										<Avatar
											size={22}
											src={<Blockies seed={String(address)} scale={2.5} />}
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
	// <ProfileButtonStyles>
	// <ConnectButton.Custom>
	// 	{({
	// 		account,
	// 		chain,
	// 		// openAccountModal,
	// 		// openChainModal,
	// 		openConnectModal,
	// 		authenticationStatus,
	// 		mounted,
	// 	}) => {
	// 		// Note: If your app doesn't use authentication, you
	// 		// can remove all 'authenticationStatus' checks
	// 		const ready = mounted && authenticationStatus !== 'loading'
	// 		const connected =
	// 			ready &&
	// 			account != null &&
	// 			chain != null &&
	// 			(!authenticationStatus || authenticationStatus === 'authenticated')

	// 		return (
	// 			<div
	// 				className='connect-button-wrapper'
	// 				{...(!ready && {
	// 					'aria-hidden': true,
	// 					style: {
	// 						opacity: 0,
	// 						pointerEvents: 'none',
	// 						userSelect: 'none',
	// 					},
	// 				})}
	// 			>
	// 				{(() => {
	// 					if (!connected) {
	// 						return (
	// 							<Button className='connect-button' onClick={openConnectModal}>
	// 								{/* { width < 930 ? 'Connect' : 'Connect Wallet' } */}
	// 								<Text style={{ color: 'white' }}>Connect Wallet</Text>
	// 							</Button>
	// 						)
	// 					}

	// 					/*
	//             if (connected && chain.unsupported) {
	//               return (
	//                 <Button
	//                   className="connect-button"
	//                   onClick={openChainModal}
	//                 >
	//                   <Text style={{ color: 'white' }}>Wrong network</Text>
	//                 </Button>
	//               )
	//             }
	//             */

	// 					return (
	// 						<Link
	// 							href={`/creator/${address}`}
	// 							className='main-account-button'
	// 						>
	// 							<div className='account-profile-wrapper'>
	// 								<Blockies seed={address} scale={6} />
	// 							</div>
	// 						</Link>
	// 					)
	// 				})()}
	// 			</div>
	// 		)
	// 	}}
	// </ConnectButton.Custom>
	// </ProfileButtonStyles>
}

export default ProfileButton
