import React, { useState, useContext, useMemo } from 'react'
import type { FC } from 'react'
import AppContext from '../../../context/AppContext'
import axios from 'axios'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import styles from '../../../styles/CreationSocial.module.css'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface PraiseButtonProps {
	creationId: string
	praises: number
	isPraised: boolean
	setIsPraised: (value: boolean, updatedPraises: number) => void
	appWidth: number
	layout: string
	page: string
}

const PraiseButton: FC<PraiseButtonProps> = ({
	creationId,
	praises,
	isPraised,
	setIsPraised,
	appWidth,
	layout = 'relative',
	page = 'creationId',
}) => {
	const context = useContext(AppContext)
	const isSignedIn = context?.isSignedIn ?? false
	const isWalletConnected = context?.isWalletConnected ?? false
	const setIsSignInModalOpen = context?.setIsSignInModalOpen ?? (() => {})
	const appTheme = context?.appTheme ?? 'light'

	const [isPraiseHovering, setIsPraiseHovering] = useState(false)

	const { openConnectModal } = useConnectModal()

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024
	const isLight = appTheme === 'light'

	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'
	const isRelative = layout === 'relative'
	const isOverlay = layout === 'overlay'

	const handlePraise = async (): Promise<void> => {
		if (!isSignedIn && isWalletConnected) {
			setIsSignInModalOpen(true)
			await Promise.resolve()
		} else if (!isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
			await Promise.resolve()
		} else if (isSignedIn && !isWalletConnected) {
			openConnectModal?.() ?? (() => null)()
			await Promise.resolve()
		} else {
			const newIsPraised = !isPraised
			const updatedPraises = newIsPraised ? praises + 1 : praises - 1
			setIsPraised(newIsPraised, updatedPraises)

			try {
				console.log('going to unreact', isPraised)
				await axios.post('/api/react', {
					creationId,
					reaction: '🙌',
					unreact: isPraised,
				})
			} catch (error) {
				setIsPraised(!newIsPraised, praises)
				console.error('Error updating praise:', error)
			}
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

	const buttonBg = useMemo(() => {
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

	const praiseGray = (
		<span
			className={`${textSize}`}
			style={{
				filter: 'grayscale(1)',
				marginBottom: 6,
			}}
		>
			{'🙌'}
		</span>
	)

	const praiseFilled = (
		<span className={`${textSize}`} style={{ marginBottom: 6 }}>
			{'🙌'}
		</span>
	)

	const handleMouseOver = (): void => {
		setIsPraiseHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsPraiseHovering(false)
	}

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
	}, [appWidth, page, layout, isLight])

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
	}, [appWidth, page, layout, isLight])

	// console.log({ countWeight })
	// console.log({ countColor })

	return (
		<div
			className='socialButtonWrapper'
			style={{
				position: isMobile ? 'relative' : 'relative',
				margin: isMobile ? 'unset' : 'unset',
				alignItems: isMobile ? 'center' : 'center',
				display: 'flex',
			}}
		>
			<Button
				className={`${String(buttonWidth)} ${String(buttonHeight)} ${String(
					buttonFlexJustify
				)} ${String(buttonBg)}`}
				shape='round'
				size={'large'}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					border: 'none',
					transition: '1s',
				}}
				onClick={async () => {
					await handlePraise()
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				<span
					className='social-icon'
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{isPraised || isPraiseHovering ? praiseFilled : praiseGray}
				</span>
				<Text
					className={`${countColor} ${countWeight} ${textSize}`}
					style={{
						filter:
							isMobile && isLight
								? 'transparent'
								: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
					}}
				>
					{isNaN(praises) ? 0 : praises}
				</Text>
			</Button>
		</div>
	)
}

export default PraiseButton
