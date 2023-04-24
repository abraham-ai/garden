import React, { useState, useContext } from 'react'
import AppContext from '../../../context/AppContext'

import type { FC } from 'react'

import { Button } from 'antd' // Popover
// import ShareExtraButton from './ShareExtraButton'
// import { FiMoreHorizontal } from 'react-icons/fi'

import { BiShare } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'

import styles from '../../../styles/CreationSocial.module.css'

interface ShareButtonProps {
	creationId: string
	layout: string
	isMobile: boolean
}

const ShareButton: FC<ShareButtonProps> = ({ creationId, isMobile }) => {
	const [isShareHovering, setIsShareHovering] = useState(false)
	const [copySuccess, setCopySuccess] = useState('')

	const context = useContext(AppContext)
	const currentTheme = context.currentTheme ?? 'light'

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
			setCopySuccess('Copied!')
		} catch (err) {
			setCopySuccess('Failed to copy!')
		}
	}

	const bgHoverStyles = isShareHovering
		? 'rgb(0, 186, 124, 0.2)'
		: 'rgba(0, 0, 0, 0.5)'

	console.log({ creationId })

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
						width: isMobile ? 30 : 50,
						height: isMobile ? 30 : 50,
						border: 'none',
						transition: '300ms',
					}}
					onClick={async () => {
						await copyToClipBoard(
							`garden.eden.art/creation/${String(creationId)}`
						)
					}}
				>
					{isShareHovering ? (
						<IoIosShareAlt
							className={styles.crSocialIcon}
							size={18}
							style={{
								bottom: isMobile ? 6 : 12,
								position: 'absolute',
								left: isMobile ? 6 : 12,
								fontSize: '1rem',
								minWidth: isMobile ? 15 : 25,
								minHeight: isMobile ? 15 : 25,
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
								bottom: isMobile ? 6 : 12,
								position: 'absolute',
								left: isMobile ? 6 : 12,
								fontSize: '1rem',
								minWidth: isMobile ? 15 : 25,
								minHeight: isMobile ? 15 : 25,
								transform: 'scaleX(-1)',
								color: isMobileThemeLight ? 'black' : 'white',
								filter: isMobileThemeLight
									? 'transparent'
									: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
							}}
						/>
					)}
				</Button>
			</span>

			{/* <div className='crSocialsExtra'>
        <Popover placement='topRight' content={<ShareExtraButton />}>
          <span className='crSocialShare'>
            <Button
              className='crSocialBtn'
              shape='circle'
              style={{ alignItems: 'center' }}
            >
              <FiMoreHorizontal className='icon' />
            </Button>
          </span>
        </Popover>
      </div> */}
		</div>
	)
}

export default ShareButton
