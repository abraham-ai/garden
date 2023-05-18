import React, { useContext, useState, useMemo } from 'react'
import type { FC } from 'react'

import AppContext from '../../../context/AppContext'

import type Creation from '../../../interfaces/Creation'

import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import axios from 'axios'

import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri'

import styles from '../../../styles/CreationSocial.module.css'

interface SaveButtonTypes {
	isBookmarked: boolean
	setIsBookmarked: (value: boolean) => void
	creation: Creation
	layout?: string
	page?: string
	appWidth: number
}

const SaveButton: FC<SaveButtonTypes> = ({
	isBookmarked,
	setIsBookmarked,
	creation,
	appWidth,
	layout = 'relative',
	page = 'creationId',
}) => {
	const [isSaveHovering, setIsSaveHovering] = useState(false)

	const context = useContext(AppContext)

	const { openConnectModal } = useConnectModal()

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'
	const isRelative = layout === 'relative'
	const isOverlay = layout === 'overlay'

	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})

	const setCollectionModalView = context?.setCollectionModalView ?? (() => null)
	const collections = context?.collections ?? []
	const setCollections = context?.setCollections ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const setIsSaveCreationModalOpen =
		context?.setIsSaveCreationModalOpen ?? (() => {})
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	// console.log({ isSignedIn })

	const handleSave = (): void => {
		// console.log({ isSignedIn })
		if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
		} else if (isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (isSignedIn && isWalletConnected) {
			console.log('handle SAVE 🔖!')
			setIsBookmarked(!isBookmarked)
			// showSaveNotification()
			setIsSaveCreationModalOpen(true)
			setCurrentCreationModalCreation(creation)
			setCollectionModalView('first-modal')
		}
	}

	const handleMouseOver = (): void => {
		// console.log('handleMouseOver')
		setIsSaveHovering(true)
	}

	const handleMouseOut = (): void => {
		// console.log('handleMouseOut')
		setIsSaveHovering(false)
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

	const bgHoverStyles = isSaveHovering
		? 'rgb(26, 115, 232, 0.4)'
		: 'rgba(0, 0, 0, 0.5)'

	const isMobileThemeLight = isMobile && currentTheme === 'light'

	// console.log({ iconSize })
	// console.log({ buttonWidth, buttonHeight, iconSize })

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

	return (
		<>
			<span
				className='crSocial bookmark'
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
					height: '100%',
					alignItems: 'center',
					// margin: isMobile ? '0 0 5px 25px' : 'unset',
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<Button
					className={`btn ${buttonSize} ${buttonBg}`}
					shape={'circle'}
					size={'large'}
					type='link'
					onClick={() => {
						handleSave()
					}}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: 'none',
						transition: '300ms',
					}}
				>
					{isBookmarked || isSaveHovering ? (
						<RiBookmarkFill
							className={`${styles.crSocialIcon} ${iconSize} ${iconColor}`}
						/>
					) : (
						<RiBookmarkLine
							className={`${styles.crSocialIcon} ${iconSize} ${iconColor}`}
						/>
					)}
				</Button>
			</span>
		</>
	)
}

export default SaveButton
