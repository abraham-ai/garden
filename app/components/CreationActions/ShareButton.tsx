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

	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'
	const isRelative = layout === 'relative'
	const isOverlay = layout === 'overlay'

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
			if (isCrIdPage) {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			} else {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			} else {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					console.log('save button overlay')
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			} else {
				if (isOverlay) {
					return '.8rem'
				} else if (isRelative) {
					return '1rem'
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const buttonSize = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 'small'
				} else if (isRelative) {
					return 'small'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 'small'
				} else if (isRelative) {
					return 'small'
				}
			} else {
				if (isOverlay) {
					return 'small'
				} else if (isRelative) {
					return 'small'
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 'default'
				} else if (isRelative) {
					return 'default'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 'default'
				} else if (isRelative) {
					return 'default'
				}
			} else {
				if (isOverlay) {
					return 'default'
				} else if (isRelative) {
					return 'default'
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					console.log('save button overlay')
					return 'large'
				} else if (isRelative) {
					return 'large'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 'large'
				} else if (isRelative) {
					return 'large'
				}
			} else {
				if (isOverlay) {
					return 'large'
				} else if (isRelative) {
					return 'large'
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const buttonWidth = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return 50
				} else if (isRelative) {
					return 50
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 50
				} else if (isRelative) {
					return 50
				}
			} else {
				if (isOverlay) {
					return 50
				} else if (isRelative) {
					return 50
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const buttonHeight = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			} else {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return 30
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					console.log('save button overlay')
					return 50
				} else if (isRelative) {
					return 50
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 50
				} else if (isRelative) {
					return 50
				}
			} else {
				if (isOverlay) {
					return 50
				} else if (isRelative) {
					return 50
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const iconSize = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 15
				} else if (isRelative) {
					return 15
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 15
				} else if (isRelative) {
					return 15
				}
			} else {
				if (isOverlay) {
					return 15
				} else if (isRelative) {
					return 15
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return 18
				} else if (isRelative) {
					return 18
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 18
				} else if (isRelative) {
					return 18
				}
			} else {
				if (isOverlay) {
					return 18
				} else if (isRelative) {
					return 18
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					console.log('save button overlay')
					return 25
				} else if (isRelative) {
					return 25
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 25
				} else if (isRelative) {
					return 25
				}
			} else {
				if (isOverlay) {
					return 25
				} else if (isRelative) {
					return 25
				}
			}
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
