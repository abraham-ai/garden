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
	const appTheme = context?.appTheme ?? 'light'

	const { openConnectModal } = useConnectModal()

	const [isBurnHovering, setIsBurnHovering] = useState<boolean>(false)

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024
	const isLight = appTheme === 'light'

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

	const textSize: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.textSizeMobile
				} else if (isRelative) {
					return styles.textSizeMobile
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.textSizeMobile
				} else if (isRelative) {
					return styles.textSizeMobile
				}
			} else {
				if (isOverlay) {
					return styles.textSizeMobile
				} else if (isRelative) {
					return styles.textSizeMobile
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.textSizeTablet
				} else if (isRelative) {
					return styles.textSizeTablet
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.textSizeTablet
				} else if (isRelative) {
					return styles.textSizeTablet
				}
			} else {
				if (isOverlay) {
					return styles.textSizeTablet
				} else if (isRelative) {
					return styles.textSizeTablet
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.textSizeDesktop
				} else if (isRelative) {
					return styles.textSizeDesktop
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.textSizeDesktop
				} else if (isRelative) {
					return styles.textSizeDesktop
				}
			} else {
				if (isOverlay) {
					return styles.textSizeDesktop
				} else if (isRelative) {
					return styles.textSizeDesktop
				}
			}
		}
	}, [appWidth, layout, page])

	const buttonWidth: string | undefined = useMemo(() => {
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
					return styles.overlayBtnWidth
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
	}, [appWidth, layout, page])

	const buttonHeight: string | undefined = useMemo(() => {
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
	}, [appWidth, layout, page])

	const buttonFlexJustify: string | undefined = useMemo(() => {
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
	}, [appWidth, layout, page])

	const buttonBg: string | undefined = useMemo(() => {
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
	}, [appWidth, layout, page])

	const iconSize: number | undefined = useMemo(() => {
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
			className={`${textSize}`}
			style={{
				filter: 'grayscale(1)',
			}}
		>
			{'🔥'}
		</span>
	)

	const burnFilled = <span className={`${textSize}`}>{'🔥'}</span>

	const handleMouseOver = (): void => {
		// console.log('handleMouseOver')
		setIsBurnHovering(true)
	}

	const handleMouseOut = (): void => {
		// console.log('handleMouseOut')
		setIsBurnHovering(false)
	}

	// console.log(isBurned)

	const countColor: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			} else {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			} else {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			} else {
				if (isOverlay) {
					return isLight ? styles.textWhite : styles.textWhite
				} else if (isRelative) {
					return isLight ? styles.textBlack : styles.textWhite
				}
			}
		}
	}, [appWidth, page, layout, appTheme])

	const countWeight: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else {
				if (isOverlay) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isLight ? styles.textWeightReg : styles.textWeightReg
				}
			}
		}
	}, [appWidth, page, layout, appTheme])

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
				className={`${buttonWidth} ${buttonHeight} ${String(
					buttonFlexJustify
				)} ${buttonBg}`}
				size={'large'}
				type='text'
				shape='round'
				style={{
					display: 'flex',
					alignItems: 'center',
					padding: isMobile ? '10px 0' : 10,
					border: 'none',
					transition: '300ms',
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
				<p
					className={`${countColor} ${countWeight} ${textSize}`}
					style={{
						filter:
							isMobile && isLight
								? 'transparent'
								: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
					}}
				>
					{isNaN(burns) ? 0 : burns}
				</p>
			</Button>
		</div>
	)
}

export default BurnButton
