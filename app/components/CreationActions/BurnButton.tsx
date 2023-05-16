import React, { useState, useContext, useMemo } from 'react'
import type { FC } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import styles from '../../../styles/CreationSocial.module.css'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface BurnButtonProps {
	creationId: string
	burns: number
	isBurned: boolean
	setIsBurned: (isBurned: boolean, updatedBurns: number) => void
	layout: string
	appWidth: number
	page: string
}

const BurnButton: FC<BurnButtonProps> = ({
	creationId,
	burns,
	isBurned,
	setIsBurned,
	layout = 'relative',
	appWidth,
	page = 'creationId',
}) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})
	const currentTheme = context?.currentTheme ?? 'light'

	const { openConnectModal } = useConnectModal()

	const [isBurnHovering, setIsBurnHovering] = useState<boolean>(false)

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024
	const isThemeLight = currentTheme === 'light'

	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'
	const isRelative = layout === 'relative'
	const isOverlay = layout === 'overlay'

	// console.log('Burn Button: CreationId: ' + creationId)

	const handleBurn = async (): Promise<void> => {
		console.log({ isSignedIn, isWalletConnected })

		if (isSignedIn && isWalletConnected) {
			console.log({ isSignedIn, isWalletConnected })
			const newIsBurned = !isBurned
			const updatedBurns = newIsBurned ? burns + 1 : burns - 1
			setIsBurned(newIsBurned, updatedBurns)

			try {
				await axios.post('/api/react', {
					creationId,
					reaction: '🔥',
					unreact: isBurned,
				})
			} catch (error) {
				setIsBurned(!newIsBurned, burns)
				console.error('Error updating praise:', error)
			}
		} else if (isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
		} else if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
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

	const buttonWidth = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			} else {
				if (isOverlay) {
					return 30
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtnWidth
				} else if (isRelative) {
					return styles.relativeBtnWidth
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const buttonHeight = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			} else {
				if (isOverlay) {
					return styles.overlayBtnHeight
				} else if (isRelative) {
					return styles.relativeBtnHeight
				}
			}
		}
	}, [isMobile, isTablet, layout, page])

	const buttonFlexJustify = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			} else {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			} else {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
				}
			} else {
				if (isOverlay) {
					return styles.justifyCenterBtn
				} else if (isRelative) {
					return styles.justifyStartBtn
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

	// console.log({ isMobile })
	// console.log({ buttonSize })

	const burnGray = (
		<span
			style={{
				filter: 'grayscale(1)',
				fontSize: textSize,
			}}
		>
			{'🔥'}
		</span>
	)

	const burnFilled = <span style={{ fontSize: textSize }}>{'🔥'}</span>

	const handleMouseOver = (): void => {
		// console.log('handleMouseOver')
		setIsBurnHovering(true)
	}

	const handleMouseOut = (): void => {
		// console.log('handleMouseOut')
		setIsBurnHovering(false)
	}

	// console.log(isBurned)

	const countColor = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				return isThemeLight ? styles.textWhite : styles.textBlack
			} else {
				return isThemeLight ? styles.textWhite : styles.textBlack
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				return isThemeLight ? styles.textWhite : styles.textBlack
			} else {
				return isThemeLight ? styles.textWhite : styles.textBlack
			}
		} else {
			if (isCrIdPage) {
				return isThemeLight ? styles.textWhite : styles.textBlack
			} else {
				return isThemeLight ? styles.textWhite : styles.textBlack
			}
		}
	}, [appWidth, page, layout, currentTheme])

	const bgHoverStyles = isBurnHovering ? '#f8a4b080' : 'rgba(0, 0, 0, 0.5)'

	// console.log({ buttonWidth })
	// console.log({ buttonHeight })
	// console.log({ buttonFlexJustify })
	// console.log({ countColor })

	return (
		<div
			className='socialButtonWrapper'
			style={{
				display: 'flex',
				alignItems: 'center',
				paddingRight: isMobile ? 10 : 10,
			}}
		>
			<Button
				className={`${String(buttonWidth)} ${String(buttonHeight)} ${String(
					buttonFlexJustify
				)}`}
				size={'large'}
				type='text'
				shape='round'
				style={{
					display: 'flex',
					alignItems: 'center',
					background: isMobile && isThemeLight ? 'transparent' : bgHoverStyles,
					padding: isMobile ? '10px 0' : 10,
					border: 'none',
					transition: '1s',
				}}
				onClick={async () => {
					await handleBurn()
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<span
					className='social-icon'
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{isBurned || isBurnHovering ? burnFilled : burnGray}
				</span>
				<Text
					className={`${countColor}`}
					style={{
						filter:
							isMobile && isThemeLight
								? 'transparent'
								: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
						fontWeight: isMobile && isThemeLight ? 'regular' : 'bold',
					}}
				>
					{isNaN(burns) ? 0 : burns}
				</Text>
			</Button>
		</div>
	)
}

export default BurnButton
