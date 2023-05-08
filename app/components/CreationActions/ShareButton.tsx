import React, { useState, useContext, useMemo } from 'react'
import AppContext from '../../../context/AppContext'

import type { FC } from 'react'

import { Button, message } from 'antd' // Popover
// import ShareExtraButton from './ShareExtraButton'
// import { FiMoreHorizontal } from 'react-icons/fi'

import { BiShare } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'

import styles from '../../../styles/CreationSocial.module.css'

interface ShareButtonProps {
	creationId: string
	appWidth: number
	page: string
	layout: string
}

const ShareButton: FC<ShareButtonProps> = ({
	creationId,
	appWidth,
	page = 'creationId',
	layout = 'relative',
}) => {
	const [isShareHovering, setIsShareHovering] = useState(false)
	const [copyResult, setCopyResult] = useState('')
	const [messageApi, contextHolder] = message.useMessage()

	const context = useContext(AppContext)
	const currentTheme = context?.currentTheme ?? 'light'

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const messageResult = () => {
		messageApi.open({
			type: 'success',
			content: copyResult,
		})
	}

	const handleMouseOver = (): void => {
		// console.log('handleMouseOver')
		setIsShareHovering(true)
	}

	const handleMouseOut = (): void => {
		// console.log('handleMouseOut')
		setIsShareHovering(false)
	}

	const copyToClipBoard = async (copyMe) => {
		console.log('copy to clipboard')
		try {
			await navigator.clipboard.writeText(copyMe)
			setCopyResult('Creaton URL Copied to Clipboard!')
		} catch (err) {
			setCopyResult('Failed to copy!')
			messageResult()
		}
	}

	const textSize = useMemo(() => {
		if (isMobile) {
			return '1rem'
		} else if (page === 'creationId' && layout === 'relative') {
			return '1rem'
		} else {
			return '1.8rem'
		}
	}, [isMobile, isTablet, layout, page])

	const buttonSize = useMemo(() => {
		if (isMobile) {
			return 'small'
		} else if (page === 'creationId' && layout === 'relative') {
			return 'small'
		} else {
			return 'large'
		}
	}, [isMobile, isTablet, layout, page])

	const buttonWidth = useMemo(() => {
		if (isMobile) {
			return 30
		} else if (page === 'creationId' && layout === 'relative') {
			return 30
		} else {
			return 100
		}
	}, [isMobile, isTablet, layout, page])

	const buttonHeight = useMemo(() => {
		if (isMobile) {
			return 30
		} else if (page === 'creationId' && layout === 'relative') {
			return 30
		} else {
			return 100
		}
	}, [isMobile, isTablet, layout, page])

	const iconSize = useMemo(() => {
		if (isMobile) {
			return 15
		} else if (page === 'creationId' && layout === 'relative') {
			return 18
		} else {
			return 25
		}
	}, [isMobile, isTablet, layout, page])

	// console.log({ iconSize })

	const bgHoverStyles = isShareHovering
		? 'rgb(0, 186, 124, 0.2)'
		: 'rgba(0, 0, 0, 0.5)'

	// console.log({ creationId })

	const isMobileThemeLight = isMobile && currentTheme === 'light'

	return (
		<div
			className='crSocialsMain'
			style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<span>
				<Button
					className='btn'
					shape='circle'
					type='link'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: isMobileThemeLight ? 'transparent' : bgHoverStyles,
						width: buttonWidth,
						height: buttonHeight,
						border: 'none',
						transition: '300ms',
					}}
					onClick={async () => {
						await copyToClipBoard(
							`garden.eden.art/creation/${String(creationId)}`
						).then(() => {
							messageResult()
						})
					}}
				>
					{isShareHovering ? (
						<IoIosShareAlt
							className={styles.crSocialIcon}
							size={18}
							style={{
								// bottom: isMobile ? 6 : 12,
								position: 'absolute',
								// left: isMobile ? 6 : 12,
								fontSize: '1rem',
								minWidth: iconSize,
								minHeight: iconSize,
								transform: 'scaleX(1)',
								color: 'rgb(0, 186, 124)',
								filter: isMobileThemeLight
									? 'transparent'
									: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
							}}
						/>
					) : (
						<BiShare
							className={styles.crSocialIcon}
							size={18}
							style={{
								// bottom: isMobile ? 6 : 12,
								position: 'absolute',
								// left: isMobile ? 6 : 12,
								fontSize: '1rem',
								minWidth: iconSize,
								minHeight: iconSize,
								transform: 'scaleX(-1)',
								color: isMobileThemeLight ? 'black' : 'white',
								filter: isMobileThemeLight
									? 'transparent'
									: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
							}}
						/>
					)}
				</Button>
				{contextHolder}
			</span>
		</div>
	)
}

export default ShareButton
