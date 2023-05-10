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
	const currentTheme = context?.currentTheme ?? 'light'

	const [isPraiseHovering, setIsPraiseHovering] = useState(false)

	const { openConnectModal } = useConnectModal()

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024
	const isThemeLight = currentTheme === 'light'

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
					return '1.4rem'
				} else if (isRelative) {
					return '1.4rem'
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return '1.4rem'
				} else if (isRelative) {
					return '1.4rem'
				}
			} else {
				if (isOverlay) {
					return '1.4rem'
				} else if (isRelative) {
					return '1.4rem'
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
					return 80
				} else if (isRelative) {
					return 80
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return 80
				} else if (isRelative) {
					return 80
				}
			} else {
				if (isOverlay) {
					return 80
				} else if (isRelative) {
					return 80
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

	const praiseGray = (
		<span
			style={{
				filter: 'grayscale(1)',
				fontSize: textSize,
				marginBottom: 6,
			}}
		>
			{'🙌'}
		</span>
	)

	const praiseFilled = (
		<span style={{ fontSize: textSize, marginBottom: 6 }}>{'🙌'}</span>
	)

	const handleMouseOver = (): void => {
		setIsPraiseHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsPraiseHovering(false)
	}

	const praiseColor = useMemo(() => {
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
	}, [appWidth, page, layout])
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
				className={isPraised ? 'crPraise isActive' : 'crPraise'}
				shape='round'
				size={'large'}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: isMobile ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
					width: buttonWidth,
					height: buttonHeight,
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
					style={{
						color: praiseColor,
						filter:
							isMobile && isThemeLight
								? 'transparent'
								: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))',
						marginLeft: 10,
						fontWeight: isMobile && isThemeLight ? 'regular' : 'bold',
					}}
				>
					{isNaN(praises) ? 0 : praises}
				</Text>
			</Button>
		</div>
	)
}

export default PraiseButton
