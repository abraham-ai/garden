'use client'

import type { FC } from 'react'

import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'

import { useSignMessage, useAccount } from 'wagmi'
import EthereumAuth from '../Ethereum/EthereumAuth'

import { Typography, Modal, Col } from 'antd'

import AppLogo from './AppLogo'

import styles from '../../../styles/SignInModal.module.css'
const { Title } = Typography

interface SignInModalProps {
	isMobile: boolean
	isMounted: boolean
	appWidth: number
}

const SignInModal: FC<SignInModalProps> = ({ isMobile, isMounted }) => {
	const { address } = useAccount()

	const context = useContext(AppContext)
	const isWalletConnected = context?.isWalletConnected ?? false
	const isSignedIn = context?.isSignedIn ?? false

	const isSignInModalOpen = context?.isSignInModalOpen ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})

	const handleCancel = (): void => {
		setIsSignInModalOpen(false)
	}

	const [appMessage] = useState(
		`I am ${String(address)} and I would like to create with Eden`
	)

	const { data, isSuccess } = useSignMessage({
		message: appMessage,
	})

	// console.log({ isSignInModalOpen })

	return (
		<Modal
			className={styles.signInModal}
			open={isSignInModalOpen}
			mask
			maskClosable
			keyboard
			onCancel={handleCancel}
			style={{
				width: '480px',
				background: 'transparent',
				border: 'transparent',
				borderRadius: '25px',
				padding: 0,
				overflow: 'hidden',
				height: 'auto',
			}}
			footer={<></>}
		>
			<Col className={styles.signInModalInnerWrapper}>
				<AppLogo logo='eden' size='x-large' position='middle' />

				<Title className={styles.signInMessageCntd} level={4}>
					{
						'Eden uses a signature from your wallet to verify that you’re the owner of this Ethereum address.'
					}
				</Title>

				<div>
					<EthereumAuth isMobile={isMobile} />
				</div>

				{isSuccess && (
					<div className={styles.signInSignatureWrapper}>
						<p className={styles.signInSignature}>{'Signature:'}</p>
						<p className={styles.signInSignature}>{data}</p>
					</div>
				)}
			</Col>
		</Modal>
	)
}

export default SignInModal
