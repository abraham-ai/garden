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

	const buttonBg: string = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtn
				} else if (isRelative) {
					return styles.relativeBtn
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	// const buttonSize = useMemo(() => {
	// 	if (isMobile) {
	// 		if (isCrIdPage) {
	// 			if (isOverlay) {
	// 				return 'small'
	// 			} else if (isRelative) {
	// 				return 'small'
	// 			}
	// 		} else if (isCreationsPage) {
	// 			if (isOverlay) {
	// 				return 'small'
	// 			} else if (isRelative) {
	// 				return 'small'
	// 			}
	// 		} else {
	// 			if (isOverlay) {
	// 				return 'small'
	// 			} else if (isRelative) {
	// 				return 'small'
	// 			}
	// 		}
	// 	} else if (isTablet) {
	// 		if (isCrIdPage) {
	// 			if (isOverlay) {
	// 				return 'default'
	// 			} else if (isRelative) {
	// 				return 'default'
	// 			}
	// 		} else if (isCreationsPage) {
	// 			if (isOverlay) {
	// 				return 'default'
	// 			} else if (isRelative) {
	// 				return 'default'
	// 			}
	// 		} else {
	// 			if (isOverlay) {
	// 				return 'default'
	// 			} else if (isRelative) {
	// 				return 'default'
	// 			}
	// 		}
	// 	} else {
	// 		if (isCrIdPage) {
	// 			if (isOverlay) {
	// 				return 'large'
	// 			} else if (isRelative) {
	// 				return 'large'
	// 			}
	// 		} else if (isCreationsPage) {
	// 			if (isOverlay) {
	// 				return 'large'
	// 			} else if (isRelative) {
	// 				return 'large'
	// 			}
	// 		} else {
	// 			if (isOverlay) {
	// 				return 'large'
	// 			} else if (isRelative) {
	// 				return 'large'
	// 			}
	// 		}
	// 	}
	// }, [isMobile, isTablet, layout, page])

	const buttonSize: string = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.buttonSizeMobile
				} else if (isRelative) {
					return styles.buttonSizeMobile
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.buttonSizeMobile
				} else if (isRelative) {
					return styles.buttonSizeMobile
				}
			} else {
				if (isOverlay) {
					return styles.buttonSizeMobile
				} else if (isRelative) {
					return styles.buttonSizeMobile
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.buttonSizeTablet
				} else if (isRelative) {
					return styles.buttonSizeTablet
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.buttonSizeTablet
				} else if (isRelative) {
					return styles.buttonSizeTablet
				}
			} else {
				if (isOverlay) {
					return styles.buttonSizeTablet
				} else if (isRelative) {
					return styles.buttonSizeTablet
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.buttonSizeDesktop
				} else if (isRelative) {
					return styles.buttonSizeDesktop
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.buttonSizeDesktop
				} else if (isRelative) {
					return styles.buttonSizeDesktop
				}
			} else {
				if (isOverlay) {
					return styles.buttonSizeDesktop
				} else if (isRelative) {
					return styles.buttonSizeDesktop
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const iconColor: string = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			} else {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			} else {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			} else {
				if (isOverlay) {
					return styles.iconColorWhite
				} else if (isRelative) {
					return styles.iconColorBlack
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const iconSize: string = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.iconSizeMobile
				} else if (isRelative) {
					return styles.iconSizeMobile
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.iconSizeMobile
				} else if (isRelative) {
					return styles.iconSizeMobile
				}
			} else {
				if (isOverlay) {
					return styles.iconSizeMobile
				} else if (isRelative) {
					return styles.iconSizeMobile
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.iconSizeTablet
				} else if (isRelative) {
					return styles.iconSizeTablet
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.iconSizeTablet
				} else if (isRelative) {
					return styles.iconSizeTablet
				}
			} else {
				if (isOverlay) {
					return styles.iconSizeTablet
				} else if (isRelative) {
					return styles.iconSizeTablet
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.iconSizeDesktop
				} else if (isRelative) {
					return styles.iconSizeDesktop
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.iconSizeDesktop
				} else if (isRelative) {
					return styles.iconSizeDesktop
				}
			} else {
				if (isOverlay) {
					return styles.iconSizeDesktop
				} else if (isRelative) {
					return styles.iconSizeDesktop
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
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				justifyContent: 'center',
				margin: 'unset',
				height: '100%',
			}}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<span>
				<Button
					className={`btn ${buttonSize} ${buttonBg}`}
					shape='circle'
					type='link'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
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
							className={`${styles.crSocialIcon} ${iconSize}`}
							size={18}
							style={{
								// bottom: isMobile ? 6 : 12,
								// left: isMobile ? 6 : 12,
								position: 'absolute',
								transform: 'scaleX(1)',
								color: 'rgb(0, 186, 124)',
								filter: isMobileThemeLight
									? 'transparent'
									: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
							}}
						/>
					) : (
						<BiShare
							className={`${styles.crSocialIcon} ${iconSize} ${iconColor}`}
							size={18}
							style={{
								// bottom: isMobile ? 6 : 12,
								// left: isMobile ? 6 : 12,
								position: 'absolute',
								transform: 'scaleX(-1)',
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
